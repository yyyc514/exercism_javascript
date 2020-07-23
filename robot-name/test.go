package main

import (
    "fmt"
    "syscall"
)

func main() {
    // pwd, err := os.Getwd()
    // if err != nil {
    //     fmt.Println(err)
    //     os.Exit(1)
    // }
    // pwd, _ := filepath.Abs("./")
    pwd, _ := syscall.Getwd()
    fmt.Println(pwd)
}
