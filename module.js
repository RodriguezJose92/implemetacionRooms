const mudiExperience = ({

  /* Datos del cliente */
  numberSku           = null , 
  tokenapi            = null ,
  idCompany           = null , 

  // Datos llenados fetch
  link3D              = null ,
  linkAR              = null ,
  linkQR              = null ,
  linkQRAD            = null ,

  // Datos GTM 
  marca               = null,
  categoria           = null,
  subcategoria        = null,
  seccion             = null,

  // Configuraciones de estilo.
  fatherContainer     = document.body ,
  zindexBTN           = 100 ,
  zindexModal         = 1000000000 ,
  flexDirectionBtns   = 'column',
  color               = null ,

  // Visibilidad ToolTip
  viewToolTip         = true,
  intervaleTime       = 9000,

}) => {

  // Petición Fetch 
  const response = () =>{

    let Body = {'skus':[numberSku]};
    let bodyString = JSON.stringify(Body);

    fetch('https://mudiview.mudi.com.co:7443/product/getProductsUrl',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'tokenapi' :`${tokenapi}`
      },
      body: bodyString
    })
    .then(data=>data.json())
    .then(data=>{

      data.data.length>0 ? (

        link3D              = data.data[0].URL_WEB ,
        linkAR              = data.data[0].URL_AR ,
        linkQR              = data.data[0].URL_QR ,

        createStyle(),
        createButtons(),
        createEvetsDataLayer()

      ) : console.log(`No se ha logrado hacer match con el SKU : ${numberSku}`)
      
    })

  };

  // Función para crear los botones "3D&AR"
  function createButtons(){

    // Creación de los botones 
    const div = document.createElement('DIV') ; 
    div.classList.add( 'containerBtnsMudi' );
    div.innerHTML = ` 
    <div class="tooltipMudiContainer" style="z-index:${zindexBTN}; flex-direction:${flexDirectionBtns}" idCompany="${idCompany}">
      <img sku="${numberSku}" class="imgBtn3D" id="img3DBtn" src="https://mudi.com.co/cliente/${idCompany}/btn3D.webp" alt="btnMudi3D" />
      <img sku="${numberSku}" class="imgBtnAR" id="imgARBtn" src="https://mudi.com.co/cliente/${idCompany}/btnAR.webp" alt="btnMudiAR" />   
    </div>`; 

    // Asociamos el evento Click con el comportamiento de crear los modales
    div.querySelector('.imgBtn3D').addEventListener('click', createModal3D , false) ;
    div.querySelector('.imgBtnAR').addEventListener('click', createModalAR , false) ;

    fatherContainer.appendChild(div);
    setTimeout(()=>{
      createToolTip(div);
    },500)
    
  };

  /* Tooltips */
  function createToolTip(div){
      const p = document.createElement('P');
      p.classList.add('tooltipMudi') ; 
      p.setAttribute('style','opacity:0')
      p.innerHTML=`<b style="color:#231c1c;">¡Nuevo!</b> Descubre como este producto se ve en 3D y en tu  Espacio usando Realidad Aumentada`;
      flexDirectionBtns == 'column' ? p.setAttribute('style','top:-50%') : p.setAttribute('style','top:-55%')
      div.querySelector('.tooltipMudiContainer').appendChild(p);
      setTimeout(()=>hideToolTip(div),intervaleTime);
  }; 

  function hideToolTip(div){
      div.querySelector('.tooltipMudi').style.opacity=1;
      div.querySelector('.tooltipMudi').style.animation=`hideElements 1s ease-in-out .5s 1 normal forwards`
  };

  // Create Modal 3D 
  function createModal3D(){
    const div = document.createElement('DIV') ; 
    div.classList.add('windowModalMudi') ; 
    div.setAttribute('style',`z-index:${zindexModal}`);

    div.innerHTML=`
        <div class="contentModal3D">
            <h1 class="closeModal" style="background-color:${color}; color:white; text-align:center">X</h1>
            <iframe class="iframeMudi3D" src="${link3D}"></iframe>
            <img class="powerByMudi3D" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
        </div>
    `;

    div.querySelector('.powerByMudi3D').addEventListener('click',()=> window.open('https://mudi.com.co','_BLANK'), false) ;
    div.querySelector('.closeModal').addEventListener('click',()=> document.querySelector('.windowModalMudi').remove() , false) ;
    document.body.appendChild(div) ;
  };

  // Create Modal AR 
  function createModalAR(){
    const div = document.createElement('DIV') ; 
        div.classList.add('windowModalMudi') ; 
        div.setAttribute('style',`z-index:${zindexModal}`);

        div.innerHTML=`
            <div class="contentModalAR">
                <h1 class="closeModal" style="background-color:${color}; color:white; text-align:center;">X</h1>
                <h2 class="modalTitleMudi">Recomendaciones para ver el producto en Realidad Aumentada.</h2>

                <div class="principalContentModalAR">

                    <div class="fristContentMudi">

                        <div class="containerMudiSteps">
                            <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step1.webp">
                            <div class="containerStepsText">
                                <h3 class="stepTitleMudi">Apunta tu teléfono al piso para ver el producto.</h3>
                                <p class="stepParagrahpMudi">Prueba otro espacio si no puedes ver el producto.</p>
                            </div>
                        </div>

                        <div class="containerMudiSteps">
                            <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step2.webp">
                            <div class="containerStepsText">
                                <h3 class="stepTitleMudi">Desplaza para visualizar.</h3>
                                <p class="stepParagrahpMudi">Mueve tu dedo en la pantalla para rotar la imagen.</p>
                            </div>
                        </div>

                        <div class="containerMudiSteps">
                            <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step3.webp">
                            <div class="containerStepsText">
                                <h3 class="stepTitleMudi">Amplia y detalla el producto.</h3>
                                <p class="stepParagrahpMudi">Controla el zoom arrastrando dos dedos en la pantalla de adentro hacia afuera.</p>
                            </div>
                        </div>

                        <div class="containerMudiSteps">
                            <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step4.webp">
                            <div class="containerStepsText">
                                <h3 class="stepTitleMudi">Toca dos veces para restablecer.</h3>
                                <p class="stepParagrahpMudi">Vuelve al tamaño original haciendo doble click sobre el producto.</p>
                            </div>
                        </div>

                        <button class="initARMudi" style="background-color:${color};">Iniciar AR</button>

                    </div>

                    <div class="secondContentMudi">
                        <h3 class="stepTitleMudi qrTitlePart"> Escanea el código QR para ver el producto en realidad aumentda.</h3>
                        <div class="containerQRMudi"></div>
                        <img class="powerByMudi" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
                    </div>

                </div>

            </div>
        `;

        div.querySelector('.closeModal').addEventListener('click',()=> document.querySelector('.windowModalMudi').remove(), false) ;

        div.querySelector('.initARMudi').addEventListener('click',()=>{
            window.open(`${linkAR}`,'_BLANK');
        });  

        function createQRnormal(){
          const img = document.createElement('iframe')
          img.classList.add('codeQRMudi');
          img.src = `${linkQR}`;
          div.querySelector('.containerQRMudi').appendChild(img);
      };

      createQRnormal();
      document.body.appendChild(div);
  }
  
  // Crear estilos remotos
  function createStyle(){
    const link = document.createElement('LINK');
    link.href=`https://mudi.com.co/module/mudi/indexRooms.css`; /* La carga de estilos se deja a discreción del cliente */
    link.setAttribute('rel','stylesheet');
    document.head.appendChild(link);
  };

  function createEvetsDataLayer(){
     /* Estos datos deben ser diligenciados por el equipo Mudi para tener una mejor trazabilidad de datos */
     dataLayer.push({

      //eventos Mudi
      'event': 'visualizacion_botones',
      'valorMudi': '1',

      // Información del producto
      'sku' : numberSku,
      'name': document.querySelector('.product-single__title').innerHTML,
      'marca': 'Rooms',
      'categoria': document.querySelectorAll('[itemprop="name"]')[1].innerHTML
    });
  }
  
  // Se inicializa el proceso de petición y respuesta Mudi 3D&ARComerce
  response();
};
