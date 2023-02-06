const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

var bodyParser = require('body-parser');

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

class Student {
    name = '';
    studentID = '';
    submissions = [];
    submission_time = '';
}

class Submission {
    name = '';
    file_code = '';
    QMA_scores = [];
    QMA_names = [];
    CMA_scores = [];
    CMA_names = [];
}

app.get("/", function(req,res){
    let student1 = new Student()
    student1.name = 'Student 1'
    student1.studentID = '123'
    student1.submission_time = 'January 1, 2023 at 11:58PM'

    let s1s1 = new Submission()
    s1s1.name = 'Homework 1'

    s1s1.file_code = '#include <iostream>\n' +
        '\n' +
        'int main() {\n' +
        '    std::cout << "Hello World!";\n' +
        '    return 0;\n' +
        '}'

    s1s1.QMA_scores = [90, 65, 10, 35];
    s1s1.QMA_names = ['CC', 'Coupling', 'Cohesion', 'LOC'];
    s1s1.CMA_scores = [100, 80, 65]
    s1s1.CMA_names = ['Variable Names', 'Class Names', 'Comment Percentage']
    student1.submissions.push(s1s1)

    let student2 = new Student()
    student2.name = 'Student 2'
    student2.studentID = '456'
    student2.submission_time = 'December 30, 2022 at 9:37PM'

    let s2s1 = new Submission()
    s2s1.name = 'Homework 1 File'

    s2s1.file_code = 'class HelloWorld {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!"); \n' +
        '    }\n' +
        '}'

    s2s1.QMA_scores = [10, 20, 50, 25];
    s2s1.QMA_names = ['CC', 'Coupling', 'Cohesion', 'LOC'];
    s2s1.CMA_scores = [45, 30, 15]
    s2s1.CMA_names = ['Variable Names', 'Class Names', 'Comment Percentage']
    student2.submissions.push(s2s1)

    student1.submissions.push(s2s1)
    student1.submissions.push(s2s1)

    let student_list = [];
    student_list.push(student1)
    student_list.push(student2)
    res.render("index.ejs", {selected_student:student_list[0], student_list:student_list});
});

app.post('/change_student', (req, res) =>{
    let id = req.body.student_list;
    console.log(id)
    let s1 = req.body.test;
    console.log(s1)

    let student1 = new Student()
    student1.name = 'Student 1'
    student1.studentID = '123'
    let s1s1 = new Submission()
    s1s1.name = 'Homework 1'

    s1s1.file_code = '#include <iostream>\n' +
        '\n' +
        'int main() {\n' +
        '    std::cout << "Hello World!";\n' +
        '    return 0;\n' +
        '}'

    student1.submission_time = 'January 1, 2023 at 11:58PM'
    s1s1.QMA_scores = [90, 65, 10, 50];
    s1s1.QMA_names = ['CC', 'Coupling', 'Cohesion', 'LOC'];
    s1s1.CMA_scores = [100, 80, 65]
    s1s1.CMA_names = ['Variable Names', 'Class Names', 'Comment Percentage']
    student1.submissions.push(s1s1)

    let student2 = new Student()
    student2.name = 'Student 2'
    student2.studentID = '456'
    let s2s1 = new Submission()
    s2s1.name = 'Homework 1 File'

    s2s1.file_code = 'class HelloWorld {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello, World!"); \n' +
        '    }\n' +
        '}'

    student2.submission_time = 'December 30, 2022 at 9:37PM'
    s2s1.QMA_scores = [10, 20, 50, 70];
    s2s1.QMA_names = ['CC', 'Coupling', 'Cohesion', 'LOC'];
    s2s1.CMA_scores = [45, 30, 15]
    s2s1.CMA_names = ['Variable Names', 'Class Names', 'Comment Percentage']
    student2.submissions.push(s2s1)

    student1.submissions.push(s2s1)
    student1.submissions.push(s2s1)

    let student_list = [];
    student_list.push(student1)
    student_list.push(student2)

    for(let i = 0; i < student_list.length; i++){
        if(student_list[i].studentID == id){
            res.render("index.ejs", {selected_student:student_list[i], student_list:student_list});
        }
    }

    // let student_list = [{student_name: 'Student 1', student_id: '123'}, {student_name: 'Student 2', student_id: '456'}, {student_name: 'Student 3', student_id: '789'},{student_name: 'Student 4', student_id: '101112'}]
    //
    // for (let i = 0; i < student_list.length; i++){
    //     if(student_list[i].student_id == id){
    //         res.render("index.ejs", {selected_student:student_list[i], student_list:student_list});
    //     }
    // }

});

app.get("/cma_summary", function(req,res){
    res.render("cma_summary.ejs");
});

app.get("/qma_summary", function(req,res){
    res.render("qma_summary.ejs");
});

