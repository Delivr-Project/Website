#!/bin/bash

# Exit on error
set -e

check_env_var() {
	VAR_NAME="$1"
	if [ -z "${!VAR_NAME}" ]; then
		echo "Error: Environment variable '$VAR_NAME' is not set."
		exit 1
	fi
}

# -------- CONFIG --------
LOCAL_DIR="$(pwd)/.output/public/"
check_env_var "DEPLOY_REMOTE_USER"
check_env_var "DEPLOY_REMOTE_PASSWORD"
check_env_var "DEPLOY_REMOTE_HOST"
check_env_var "DEPLOY_REMOTE_DIR"
# -------- END CONFIG --------

echo "Starting deployment to $DEPLOY_REMOTE_USER@$DEPLOY_REMOTE_HOST..."

set +e

sshpass -p "$DEPLOY_REMOTE_PASSWORD" rsync -avz \
	--delete \
	-e "ssh -o StrictHostKeyChecking=no" \
	"$LOCAL_DIR" \
	"$DEPLOY_REMOTE_USER@$DEPLOY_REMOTE_HOST:$DEPLOY_REMOTE_DIR"

rsync_exit=$?

set -e

# Exit code 23 = partial transfer (e.g., permission denied on root dir) - acceptable
if [ $rsync_exit -ne 0 ] && [ $rsync_exit -ne 23 ]; then
	echo "rsync failed with exit code $rsync_exit"
	exit $rsync_exit
fi

echo "Deployment completed."
