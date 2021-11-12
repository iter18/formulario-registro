const Formulario = () =>{
    const [ageReal,setAge] = React.useState(0);
    const [pais,setPais] = React.useState("Digita el código de tu país arriba");
    const [result,setResult] = React.useState("sinResultado");

  const processForm = () =>{
      const ageBorned = document.querySelector("#anio").value;
      //alert(`año: ${edadReal}`);
      setAge(calcEdad(ageBorned));
      const codeContry = document.querySelector("#codigoP").value;
      const datas = buscar().then((response) =>  response.map((dat) =>{
        if(codeContry == dat.code){
            console.log(dat.country)
            setPais(dat.country)
            setResult("resultado");
        }
     })
     ); 
  }
    return(
        <div >
            <hr/>
            <br/>
            <div>
                <table className="texto-center">
                    <tr>
                        <td><label>Nombre:</label></td>
                        <td><input type="text" name="name" id="name"/></td>
                    </tr>
                    <tr>
                        <td><label>Apellidos:</label></td>
                        <td><input type="text" name="surname" id="surname"/></td>
                    </tr>
                    <tr>
                        <td><label>Teléfono:</label></td>
                        <td><input type="text" name="phone" id="phone"/></td>
                    </tr>
                    <tr>
                        <td><label>Año de Nacimiento:</label></td>
                        <td><input type="text" name="anio" id="anio"/> </td>
                    </tr>
                    <tr>
                        <td><label>Código de País:</label></td>
                        <td><input type="text" name="codigoP" id="codigoP"/></td>
                    </tr>
                </table>
                <br/>                                                     
                <button id="btn-form" onClick={processForm}>ENVIAR</button>   
                <hr/>                
                <br/>
                <h4>Tu edad calculada es: <span className={result}>{ageReal}</span> </h4>
                <h4>El país correspondiente al código digitado es:<span className={result}> {pais}</span> </h4>                             
            </div>
        </div>
    );
}

const calcEdad = (ageBorn) =>{
    const fecha = new Date();
    const fechaActual = fecha.getFullYear();
    let edad;
    edad = fechaActual - ageBorn;
    return edad;
}

const buscar = async () =>{
    const {data} = await axios.get("./backend/paises.js");
    return data;
}