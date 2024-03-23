FROM arm64v8/photon:1.0GA

ENV FILES_LOCATION $FILES_LOCATION

ENV NVM_VERSION=0.39.1
ENV NODE_VERSION=v18.13.0

# First update dnf, and install tar & gzip so that nvm can install successfully
RUN dnf -y update && \
    dnf -y install wget && \
    dnf install -y tar.aarch64 && \
    dnf install -y gzip && \
    dnf -y install git && \
    dnf clean all

# Install nvm, node and npm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash
ENV PATH="/root/.nvm/:${PATH}"
RUN . nvm.sh install ${NODE_VERSION}
RUN . nvm.sh alias default ${NODE_VERSION}
RUN . nvm.sh use default
ENV PATH="/root/.nvm/versions/node/${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Install pm2
RUN npm i -g pm2

# Update
RUN pm2 update

# # Install pm2 log-rotate
RUN pm2 install pm2-logrotate

# Install NGINX
RUN dnf install -y nginx

# Configure NGINX
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx

# Create app directory
WORKDIR /usr/src/filesystem-server

# Copy Application Files
COPY . /usr/src/filesystem-server/

### TODO