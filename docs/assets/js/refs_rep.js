var filepath = "../assets/json/References.json";
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
  let sort_option_selected = document.getElementById('sort_opt').value;
  if(sort_option_selected==="year"){
    referencesArray.sort((a, b) => {
      const yearA = a[1]['issued']['dateparts'][0][0];
      const yearB = b[1]['issued']['dateparts'][0][0];
      return yearA - yearB;
    });
  }
  else if(sort_option_selected==="alphabetic"){
    referencesArray.sort(function(a, b) {
      var uniqueIdA = a[0];
      var uniqueIdB = b[0];
      return uniqueIdA.localeCompare(uniqueIdB);
    });
  }
  else if(sort_option_selected==="structure"){
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
  var references = await sort_references();
  references_div.innerHTML = "";
  for( const ref_key in sorted_references){
//     create ref container
    const ref_div = document.createElement('div');
    ref_div.setAttribute('id', ref_key);
    ref_div.setAttribute('class', 'reference');
    //     get authors
    let authors = '';
    let name = '';
    if(references.ref_key.author.length<3){
      for(i=0;i<references.ref_key.author.length;i++){
        name = references.ref_key.author[i].family + ', ' + references.ref_key.author[i].given.chatAt(0) + '. ';
        authors += name;
      }
    }
    else{
      name = references.ref_key.author[0].family + ', ' + references.ref_key.author[0].given.chatAt(0) + '. ';
      authors = name + ' et al.';
    }
    ref_div.appendChild(document.createTextNode(authors));
//     get year
    ref_div.appendChild(document.createTextNode(references.ref_key.issued['date-parts'][0][0]));
//     get title
    ref_div.appendChild(document.createTextNode(references.ref_key.title));
//     append DOI and Keywords
    ref_div.appendChild(document.createTextNode('\nDOI:' ));
    var link = document.createElement('a');
    link.setAttribute('href', references.ref_key.URL)
    link.setAttribute('target', '_blank');
    link.appendChild(document.createTextNode(references.ref_key.DOI));
    ref_div.appendChild(document.createTextNode('\nKeywords:' ));
    let keywords = '';
    for(i=0;i<references.ref_key.keywords.length; i++){
      keywords += references.ref_key.keywords[i];
      if(i<(references.ref_key.keywords.length-1)){
        keywords += ', ';
      }
    }
    ref_div.appendChild(document.createTextNode(keywords));
    references_div.appendChild(ref_div);
  }
  
}
