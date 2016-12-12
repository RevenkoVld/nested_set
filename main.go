package main

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"encoding/json"
	"net/http"
)


var db, err = sql.Open("mysql", "root:112@/test?charset=utf8")

type Node struct {
		Id int
		Label string
		Lft int
		Rgt int
}

type Nodeslice struct {
	Nodes []Node
}



func main() {

	http.HandleFunc("/getAll", getAll)
  http.ListenAndServe(":8080", nil)

}


func getAll(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query("SELECT * FROM test ORDER BY id;")
	checkErr(err)
	var nodes Nodeslice

	for rows.Next() {
		var id int
		var label string
		var lft int
		var rgt int

		err = rows.Scan(&id, &label, &lft, &rgt)
		checkErr(err)
		nodes.Nodes = append(nodes.Nodes, Node{Id: id, Label: label, Lft: lft, Rgt: rgt})
	}

  b, err := json.Marshal(nodes)
	checkErr(err)

	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

func checkErr(err error) {
    if err != nil {
        panic(err)
    }
}
