if [ $# -eq 0 ]; then
    echo "NO arguments supplied"
else
    for i in "$1" "$2" "$3"
    do
            if [ -n "$i" ]; then
                echo "$i"
            fi  
    done  
fi
