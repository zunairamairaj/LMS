
$("#add_student").submit(function(event) {
    console.log("created new student")
})

$("#update_student").submit(function(event) {
    console.log("starting to edit student")

    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value']
    })

    console.log(unindexed_array)
    console.log(data)

    var request = {
        "url" : `http://localhost:3000/api/students/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    $.ajax(request).done(function(response){
        console.log("edited student")
    })

    window.location = "/";
})

// Delete for students
if(window.location.pathname == "/") {
    $ondelete =  $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id =$(this).attr("data-id")
       
        var request = {
            "url" : `http://localhost:3000/api/students/${id}`,
            "method" : "DELETE"
        }

        $.ajax(request).done(function(response){
            console.log("student dead");
            location.reload();
        })
        
    })
}

$("#update_teacher").submit(function(event) {
    console.log("starting to edit teacher")

    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value']
    })

    console.log(unindexed_array)
    console.log(data)

    var request = {
        "url" : `http://localhost:3000/api/teachers/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    $.ajax(request).done(function(response){
        console.log("edited teacher")
    })

    window.location = "/teachers";
})


// Delete for teachers
if(window.location.pathname == "/teachers") {
    $ondelete =  $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id =$(this).attr("data-id")
       
        var request = {
            "url" : `http://localhost:3000/api/teachers/${id}`,
            "method" : "DELETE"
        }

        $.ajax(request).done(function(response){
            console.log("teacher dead");
            location.reload();
        })
        
    })
}


$("#add_course").submit(function(event) {
    console.log("starting to add course")

    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value']
    })

    console.log(unindexed_array)
    var tid = data['teacher_id']
    delete data['teacher_id']

    console.log(data)
    console.log(tid)

    var request = {
        "url" : `http://localhost:3000/api/courses/${tid}`,
        "method" : "POST",
        "data" : data
    }
    $.ajax(request).done(function(response){
        console.log("created course")
    })

    window.location = "/courses";
})


$("#update_course").submit(function(event) {
    console.log("starting to edit course")

    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value']
    })

    console.log(unindexed_array)
    console.log(data)

    var request = {
        "url" : `http://localhost:3000/api/courses/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    $.ajax(request).done(function(response){
        console.log("edited course")
    })

    window.location = "/courses";
})

// Delete for courses
if(window.location.pathname == "/courses") {
    $ondelete =  $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id =$(this).attr("data-id")
       
        var request = {
            "url" : `http://localhost:3000/api/courses/${id}`,
            "method" : "DELETE"
        }

        $.ajax(request).done(function(response){
            console.log("course dead");
            location.reload();
        })
    
    })
}


if (window.location.href.indexOf("/open-course") > -1) {
    $ondelete =  $(".table tbody td a.delete");
    $ondelete.click(function() {
        var cid =$(this).attr("c-id")
        var sid =$(this).attr("s-id")
       
        var request = {
            "url" : `http://localhost:3000/api/courses/${cid}/${sid}`,
            "method" : "DELETE"
        }

        $.ajax(request).done(function(response){
            console.log("course dead");
            location.reload();
        })
        
        location.reload();
    })
}