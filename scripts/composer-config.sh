#!/bin/sh

set -eu

cd "$(dirname "$0")/.."

composer install

mkdir -p framework/lib

if [ -e framework/lib/vendor ] || [ -L framework/lib/vendor ]; then
	rm -rf framework/lib/vendor
fi

ln -s ../../vendor framework/lib/vendor

echo "Composer dependencies installed and framework/lib/vendor linked to gutenverse-core/vendor."
