/*
 * John Doll
 * Javascript for ajax form
 * cse270e - 01/06/2023
 *
 * Form Fields
 * firstname
 * status
 * bldg
 * */

URL="https://ceclnx01.cec.miamioh.edu/~campbest/270e/form-ajax.php";

//called to make sure there are at least two characetrs in the input box
function checkLength(field) {
  $("#submitError").hide();
  var f = "#" + field;
  word = $(f).val().trim();
  if (word.length >2) 
  {
    $("#"+field+"Error").hide();
    return true;
  } else {
    $("#"+field+"Error").show();
    return false;
  }
}

//final validation of all fields before submit
function validateForm() {
  valid = true
  //check length of firstName
  if ($("#firstname").val().length < 2)
    valid = false;
    // check length of lastName
    if ($("#lastname").val().length < 2)
    valid = false;
    // check length of comments
    if ($("#comment").val().length < 2)
    valid = false;
    // check length of currentcity
    if ($("#currentcity").val().length < 2)
    valid = false;
    // check length of hometown
    if ($("#hometown").val().length < 2)
    valid = false;
    // check length of miamiuid
    if ($("#miamiuid").val().length < 2)
    valid = false;
  
  //make sure a building is selected
  if ($("#bldg").val() == null)
    valid = false;
    //make sure a year is selected
  if ($("#year").val() == null)
    valid = false;
  return valid;
}

//  Clear the form elements, make sure to uncheck all checkboxes and other input types
function clearForm() {
  $("#firstname").val("");
  $("#bldg").val("");
  $("#faculty").prop("checked",false);
  $("#student").prop("checked",false);
  $("#lastname").val("");
  $("#comment").val("");
  $("#currentcity").val("");
  $("#hometown").val("");
  $("#miamiuid").val("");
  $("#year").val("");
}

//called by submit routine to actually do the POST submit.  It is imperative that we STOP the normal browser submit and
//do this submit via the POST call here
function submitForm() 
{

  var d={};                                 //holds the data to be submitted, get the fields from the form into this object.
  d['firstname'] = $("#firstname").val();

    d['lastname'] = $("#lastname").val();
    d['miamiuid'] = $("#miamiuid").val();
    d['hometown'] = $("#hometown").val();
    
    
    
    d['year'] = $("#year").val();

  if($("#faculty").prop("checked"))
    d['faculty'] = "Yes";
  else
    d['faculty']="No";
  if($("#student").prop("checked"))
    d['student'] = "Yes";
  else
    d['student']="No";
  d['bldg'] = $("#bldg").val();
  d['comment'] = $("#comment").val();
    d['currentcity'] = $("#currentcity").val();
  d['uid'] = 'dolljm';                    //hard code this value so we know which form was used to submit this data             
  console.log("json data being sent");
  console.log(d);
  console.log(JSON.stringify(d));

  $.post(URL,JSON.stringify(d),function(data,success) {     //now do the actual post call to the given url
    if (success==="success" && data.status=="ok") 
    {
      //it worked,  clear out the old form and update the table wiht the data returned in the post call
      $("#messages").prepend("<li>"+data.msg+"</li>")
      clearForm();
      updateTable(data.data);
    }
    else 
      //oops, there was an error returned in the JSON, however the HTTP return was a 200
      $("#messages").prepend("<li>Error " + data.msg + "</li>");
  },"json")
    .error(function() {
      //we got a non 200 HTTP response, so there is an error in communicationg with the api
      $("#messages").prepend("<li>Error contacting the server</li>");
    });;

}

//make a GET call to the API which returns data. Use this data to update the table
function callUpdateTable() {
  $.get(URL,function(returnData,status) {        //call api, process results
    if (returnData.status == "ok") {
      updateTable(returnData.data)
    }
    else {//error on get data
      $("#messages").prepend("<ul>Error on api update</ul>");
    }

  },"json").error(function() {
      //we got a non 200 HTTP response, so there is an error in communicationg with the api
      $("#messages").prepend("<li>Error contacting the server</li>");
    });;


}

//this does the actual table update
function updateTable(tableData) {
  $("#tabledata").html(""); //clear out existing table data
  for (i=0,n=tableData.length;i<n;i++) {
    $("#tabledata").append("<tr>");
    $("#tabledata").append("<td>"+tableData[i].firstname+"</td>");
    $("#tabledata").append("<td>"+tableData[i].lastname+"</td>");
    $("#tabledata").append("<td>"+tableData[i].miamiuid+"</td>");
    $("#tabledata").append("<td>"+tableData[i].hometown+"</td>");
    $("#tabledata").append("<td>"+tableData[i].bldg+"</td>");
    $("#tabledata").append("<td>"+tableData[i].faculty+"</td>");
    $("#tabledata").append("<td>"+tableData[i].student+"</td>");
    $("#tabledata").append("<td>"+tableData[i].comment+"</td>");
    $("#tabledata").append("<td>"+tableData[i].currentcity+"</td>");
    $("#tabledata").append("<td>"+tableData[i].year+"</td>");
    $("#tabledata").append("</tr>");
  }
}


//call these commands when the entire page is loaded
$(document).ready(function() {
  $("#submitError").hide();

  $("#firstnameError").hide();                  //hide error message at form load

  $("#firstname").keyup(function() {            //add the function to check for errors
    checkLength("firstname");
  });

  $("#lastnameError").hide();                  //hide error message at form load

  $("#lastname").keyup(function() {            //add the function to check for errors
    checkLength("lastname");
  });

  $("#miamiuidError").hide();                  //hide error message at form load

  $("#miamiuid").keyup(function() {            //add the function to check for errors
    checkLength("miamiuid");
  });

    $("#hometownError").hide();                  //hide error message at form loadError").hide();                  //hide error message at form load

  $("#hometown").keyup(function() {            //add the function to check for errors
    checkLength("hometown");
  });

  $("#currentcityError").hide();                  //hide error message at form load

  $("#currentcity").keyup(function() {            //add the function to check for errors
    checkLength("currentcity");
  });

  $("#commentError").hide();                  //hide error message at form load

  $("#comment").keyup(function() {            //add the function to check for errors
    checkLength("comment");
  });

  $("#myform").submit(function(event) {         //add the code to actually do the form submit
    event.preventDefault();                     // !!!! CRITICAL to stop the normal submit process
    if (!validateForm()) {
      $("#submitError").show();
    }
    else {
      $("#submitError").hide();
      submitForm();
    }
  });

  $("#update").click(callUpdateTable);      //add the hanler to the submit button
  clearForm();                              //clear out any junk in the form
  callUpdateTable();                        //update table on page load
});


