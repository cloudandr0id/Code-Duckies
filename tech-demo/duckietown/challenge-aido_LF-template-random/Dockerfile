ARG DOCKER_REGISTRY=docker.io
ARG ARCH=amd64
ARG MAJOR=daffy
ARG BASE_TAG=${MAJOR}-${ARCH}
FROM ${DOCKER_REGISTRY}/duckietown/dt-commons:${BASE_TAG}

ARG PIP_INDEX_URL="https://pypi.org/simple"
ENV PIP_INDEX_URL=${PIP_INDEX_URL}
RUN echo PIP_INDEX_URL=${PIP_INDEX_URL}

WORKDIR /code

COPY requirements.* ./
RUN cat requirements.* > .requirements.txt
RUN python3 -m pip install -r .requirements.txt

COPY . .

RUN node-launch --config node_launch.yaml --check

ENTRYPOINT ["node-launch", "--config", "node_launch.yaml"]
