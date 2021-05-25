# TODO: Document the code
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

info
echo "Setting up..."
echo ""
sleep 1

info
echo "> ./verify.sh"
echo ""
sleep 0.2

bash ./verify.sh
echo ""
sleep 1

info
echo "> ./setup.sh"
echo ""

info 
echo "Creating .env file..."
sleep 0.3
touch .env
echo -e "\nTOKEN=\n" >> .env

sleep 0.1

info
echo "Done"

info
echo "Note: Please paste your bot token after the 'TOKEN=' in the .env file"
echo ""

sleep 0.5

info
echo "Verifying 'tsc'..."

if ! command -v tsc &> /dev/null ; then
    info
    echo "'tsc' is not found on your machine. Install 'tsc'?"

    info
    echo "[yes/no/cancel]"

    info
    echo -e "\t[1]: yes: Yes, install 'tsc' with NPM"

    info
    echo -e "\t[2]: no: No, use NPX instead"

    info
    echo -e "\t[3]: cancel: Cancel this setup"

    read opt
    echo ""

    case $opt in
    "1" | yes | Yes | y)
        info
        echo "Installing 'tsc' now..."
        npm i --silent typescript @types/node

        if command -v tsc &> /dev/null ; then
            info
            echo "Sucessfully installed"
        else
            error
            echo "Failed to install"

            error
            echo "Aborting..."

            exit
        fi
        ;;

    "2" | no | No | n)
        info
        echo "Using NPX"
        echo -e "\nTSC=false\n" >> .env
        ;;
    
    "3" | cancel | Cancel | c)
        info
        echo "Cancelling..."
        exit
        ;;

    *)
        error
        echo "Invalid option"

        error
        echo "Aborting..."

        exit
        ;;
    esac
else
    echo -e "\nTS=true\n" >> .env
fi

info
echo "Done"
echo ""

