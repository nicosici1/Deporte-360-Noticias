async function getNoticias() {
    return  fetch('http://localhost:2222/api/noticias', {
      headers:{
        'auth-token' : localStorage.getItem('token')
      }
    })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener los datos de la API.');
          }
        })
  
  
  }
  
  export default getNoticias