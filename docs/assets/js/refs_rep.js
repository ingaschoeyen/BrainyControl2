var filepath = "../assets/json/References.json";

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
  console.log('references queried');
  var referencesArray = Object.entries(references);
  // sort references according to option (default year)
  let sort_option_selected = document.getElementById('sort_opt').value;
  if(sort_option_selected==="year"){
    referencesArray.sort(function(a, b){
       return  a.year - b.year;
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
  console.log(sorted_references);
  return sorted_references;
}

async function create_ref_display(){
  var references = await sort_references();
  console.log('sorted references received');
  var references_div = document.getElementById("references")
  for( const ref_key in references){
//     create ref container
    console.log(ref_key + 'loop');
    const ref_div = document.createElement('div');
    ref_div.setAttribute('id', ref_key);
    ref_div.setAttribute('class', 'reference');
    //     get authors
    let authors = [];
    let name = '';
    let author_length = '';
    references[ref_key].author.forEach((element, index)=>{
      let author = element.family + ', ' + element.given.charAt(0) + '. ';
      authors[index] = author;
    });
    if(authors.length <= 3){
      for(i=0;i<authors.length;i++){
        name += authors[i];
        if(i<(authors.length-1)){
          name += ', ';
        }
      }
    }
    else{
      name = authors[0] + ' et al.';
    }
    console.log('name' + name);
    console.log('authors' + authors);
    ref_div.appendChild(document.createTextNode(name));
//     get year
    ref_div.appendChild(document.createTextNode(references[ref_key].issued['date-parts'][0][0]));
//     get title
    ref_div.appendChild(document.createTextNode(references.ref_key.title));
    ref_div.appendChild(document.createTextNode('\nauthors:'));
    ref_div.appendChild(document.createTextNode(authors));
//     append DOI and Keywords
    ref_div.appendChild(document.createTextNode('\nDOI:' ));
    var link = document.createElement('a');
    link.setAttribute('href', references.ref_key.URL)
    link.setAttribute('target', '_blank');
    link.appendChild(document.createTextNode(references.ref_key.DOI));
    ref_div.appendChild(link);
    ref_div.appendChild(document.createTextNode('\nKeywords:' ));
    let keywords = '';
    for(i=0;i<references[ref_key].keywords.length; i++){
      keywords += references[ref_key].keywords[i];
      if(i<(references[ref_key].keywords.length-1)){
        keywords += ', ';
      }
    }
    ref_div.appendChild(document.createTextNode(keywords));
    references_div.appendChild(ref_div);
  }
  
}
