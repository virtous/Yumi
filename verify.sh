# Color variables
RED="\e[31m"
GREEN="\e[32m"
NC="\e[0m"

# Our 'info' function
info() {
    printf "Bash: [${GREEN}Info${NC}]: "
}

# Our 'error' function
error() {
    printf "Bash: [${RED}Error${NC}]: "
}

# First, we will verify Git
info
echo "Verifying Git..."
sleep 1

# This will be triggered if the Git is not installed 
if ! command -v git &> /dev/null ; then
    error
    echo "'git' not found on your PATH variable"

    error
    echo "Aborting..."

    exit
fi

info
echo "Verified"
echo ""

sleep 0.5

# Now, we will verify NodeJS
info
echo "Verifying NodeJS..."

sleep 1

# This will be triggered if the NodeJS is not installed
if ! command -v node &> /dev/null ; then
    error
    echo "'node' not found on your PATH variable"

    error
    echo "Aborting..."

    exit
fi

info
echo "Verified"
echo ""

sleep 0.5

# Lastly, we will verify NPM
info
echo "Verifying NPM..."

sleep 1

# This will be triggered if the NPM is not installed
if ! command -v npm &> /dev/null ; then
    error
    echo "'npm' not found on your PATH variable"

    error
    echo "Aborting..."

    exit
fi

info
echo "Verified"
echo ""

sleep 0.3

info
echo "Verification process completed"