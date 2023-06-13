var filepath = "assets/json/References.json";
var references_div = document.getElementById("references");
var sort_option = document.getElementById("sort_opt");

async function call_references(){ 
  try {
    const response = await fetch(filepath, {
      method: 'GET',
      credentials: 'same-origin'
    });
    const references = await response.json();
    return references;
  } catch (error) {
    console.error(error);
  }
}

async function sort_references(){
  const references = await call_references();
  var referencesArray = Object.entries(references);
  // sort references according to option (default year)
  if(sort_option.value==="year"){
    referenceArray.sort((a, b) => {
      const yearA = a[1]['issued']['dateparts'][0][0];
      const yearB = b[1]['issued']['dateparts'][0][0];
      return yearA - yearB;
    });
  }
  else if(sort_option.value==="alphabetic"){
    referencesArray.sort(function(a, b) {
      var uniqueIdA = a[0];
      var uniqueIdB = b[0];
      return uniqueIdA.localeCompare(uniqueIdB);
    });
  }
  else if(sort_option.value==="structure"){
    alert("not implemented yet");
    return references;
  }
  else{
    alert("Unexpected Sorting Option");
    return references;
  }
  const sorted_references = Object.fromEntries(referencesArray);
  return sorted_references;
}

async function create_ref_display(){
  var sorted_references = await sort_references();
  
  
}
