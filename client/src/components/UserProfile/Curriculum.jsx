
import React from "react";
import { useState } from "react";
import axios from "axios"

function Curriculum() {
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
  const idPostulante=dataUserLocalStorage.Postulants[0].id
  const [file, setFile] = useState(null);
  const pdf = dataUserLocalStorage.Postulants[0].curriculum_pdf || file;
  const [isPdf, SetIsPdf] = useState(false);
  const [error, setError] = useState({
    size: false,
    type: false,
  });
  const handlerFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 5 * 1024 * 1024) {
      // manejar el caso en el que el archivo seleccionado es demasiado grande
      setError({
        type:false,
        size: true,
      });
      setFile(null);
      SetIsPdf(false);
   return ;
    }

    if (!["application/pdf"].includes(selectedFile.type)) {
      // manejar el caso en el que el tipo de archivo seleccionado no es compatible
      setError({
        size:false,
        type: true,
      });
      setFile(null);
      SetIsPdf(false);

      return ;
    }else{
  setError({
  type: false,
  size: false,
});
SetIsPdf(true);
setFile(selectedFile);
    }

  };

const handleSubmit=(event)=>{
  event.preventDefault()
  const formData = new FormData();
  formData.append("pdf", file);
  axios.post(`/upload-cv-user/${idPostulante}`,formData)
  .then((respose)=>{
    alert("Se Agrego el nuevo curriculum a la base de datos")
  })
  .catch((error)=>{
    console.log(error)
    alert("Algo salio mal :(")
  })
}




  return (
    <div
      className=" flex justify-start flex-grow h-full  flex-col"  style={{ textAlign: "center" }}>
      {pdf ? (
        <div className="h-1/2">
          <object
            data={pdf || URL.createObjectURL(file)}
            type="application/pdf"
            style={{ width: "100%", height: "100%" }}
          >
          </object>

        </div>
      ) : (
        <div className="h-1/2 flex flex-col justify-around">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            Aún no has cargado tu curriculum
          </h2>
          <p className="text-gray-400 text-2xl text-center">
            ¡Cárgalo ahora para aumentar tus posibilidades de conseguir un
            trabajo en FusionaJob!
          </p>

         
        </div>
      )} <form
      onSubmit={handleSubmit}>
       <input type="file"
        onChange={handlerFile} />
       <div>
         {error.size ? (
           <p className="text-red-600 select-none font-bold  mb-1">EL tamaño del archivo maximo es de 5MB</p>
         ) : null}
         {error.type ? <p className="text-red-600 select-none font-bold  mb-1">Solo puedes ingresar archivos pdfs</p> : null}
       </div>
       <button
         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed w-full"
         type="submit"
         disabled={!isPdf}
       >
     { pdf? "Cambiar Curriculum" : " Subir Curriculum"}
       </button>
     </form>
       
            <a href={pdf} 
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Ver Curriculum
            </a>
          

          
     
    </div>
  );
}

export default Curriculum;

{/* <a 
className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
href={pdf} download>
  Descargar Curriculum
</a>
*/}

