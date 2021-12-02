import io

import numpy as np
from PIL import Image

from aido_schemas import (
    Context,
    DB20Commands,
    DB20ObservationsWithTimestamp,
    DB20OdometryWithTimestamp,
    EpisodeStart,
    GetCommands,
    JPGImageWithTimestamp,
    LEDSCommands,
    logger,
    PWMCommands,
    RGB,
)


class RandomAgent:
    n: int

    def init(self, context: Context):
        self.n = 0
        context.info("init()")

    def on_received_seed(self, data: int):
        np.random.seed(data)

    def on_received_episode_start(self, context: Context, data: EpisodeStart):
        context.info(f'Starting episode "{data.episode_name}"')
        logger.info(data=data)

    def on_received_observations(self, context: Context, data: DB20ObservationsWithTimestamp):
        profiler = context.get_profiler()
        camera: JPGImageWithTimestamp = data.camera
        odometry: DB20OdometryWithTimestamp = data.odometry
        context.info(f"camera timestamp: {camera.timestamp}")
        context.info(f"odometry timestamp: {odometry.timestamp}")
        with profiler.prof("jpg2rgb"):
            _rgb = jpg2rgb(camera.jpg_data)

    def on_received_get_commands(self, context: Context, data: GetCommands):
        self.n += 1

        # behavior = 0 # random trajectory
        behavior = 1  # primary motions

        pwm_left = .25
        pwm_right = .25

        # if behavior == 0:
        #     pwm_left = np.random.uniform(0.5, 1.0)
        #     pwm_right = np.random.uniform(0.5, 1.0)
        col = RGB(0.0, 1.0, 1.0)
        # elif behavior == 1:
        #     t = data.at_time
        #     d = 1.0

        #     phases = [
        #         (+1, -1, RGB(1.0, 0.0, 0.0)),
        #         (-1, +1, RGB(0.0, 1.0, 0.0)),
        #         (+1, +1, RGB(0.0, 0.0, 1.0)),
        #         (-1, -1, RGB(1.0, 1.0, 0.0)),
        #     ]
        #     phase = int(t / d) % len(phases)
        #     pwm_right, pwm_left, col = phases[phase]

        # else:
        #     raise ValueError(behavior)

        led_commands = LEDSCommands(col, col, col, col, col)
        pwm_commands = PWMCommands(motor_left=pwm_left, motor_right=pwm_right)
        commands = DB20Commands(pwm_commands, led_commands)
        context.write("commands", commands)

    def finish(self, context: Context):
        context.info("finish()")


def jpg2rgb(image_data: bytes) -> np.ndarray:
    """Reads JPG bytes as RGB"""

    im = Image.open(io.BytesIO(image_data))
    im = im.convert("RGB")
    data = np.array(im)
    assert data.ndim == 3
    assert data.dtype == np.uint8
    return data
