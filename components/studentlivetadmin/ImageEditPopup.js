import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import AvatarEditor from 'react-avatar-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';


const ImageEditPopup = ({ isOpen, onClose, onSave, saveimagelocation, uploadAspectRatio }) => {
  const [editorScale, setEditorScale] = useState(1);
  const [editorPosition, setEditorPosition] = useState({ x: 0.5, y: 0.5 });
  const [imageFile, setImageFile] = useState(null);
  const editorRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0, position: { x: 0.5, y: 0.5 } });
  
  const [calculatedWindowScale, setCalculatedWindowScale] = useState(null);


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  

  const handleSave = () => {
    if (!editorRef.current || !imageFile) {
      console.error('Editor reference or image file is not available.');
      return;
    }


    //console.log("saveimagelocation" + saveimagelocation)
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob((blob) => {
      onSave(blob, saveimagelocation); // Pass the blob object to the onSave function
      onClose();
    }, 'image/jpeg');
  };

  const handlePositionChange = (newPosition) => {
    setEditorPosition(newPosition);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      position: editorPosition,
    };
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
  
    if (!editorRef.current || !imageFile) return;
  
    const imageWidth = editorRef.current.props.width;
    const imageHeight = editorRef.current.props.height;
  
    const newX = touchStart.current.position.x - (deltaX / imageWidth);
    const newY = touchStart.current.position.y - (deltaY / imageHeight);
  
    setEditorPosition({
      x: Math.max(0, Math.min(1, newX)),
      y: Math.max(0, Math.min(1, newY)),
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOptions({
        touchStart,
        touchMove: handleTouchMove,
      });
    }
  }, []);


   // Track screen width dynamically
   useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth); // Adjust as needed
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    
    if (uploadAspectRatio === 1){
      setCalculatedWindowScale((1));//setCalculatedWindowScale((screenWidth*0.75));
    } 
    if (uploadAspectRatio === 2.18){
      const size = ((screenWidth*0.75)/1800) > 0.6 ? 0.6 : ((screenWidth*0.75)/1800);
      setCalculatedWindowScale(size);
    }
    
    
  }, [imageFile, screenWidth]);
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        zIndex: 2000,
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: screenWidth > 600? '75%': "94%", 
          height: '77%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -37%)',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: "15px",
          outline: 'none',
          padding: '20px',
        },
      }}
      //className="modal"
      ariaHideApp={false}
    >
      <FontAwesomeIcon className="cart-icon" style={{ zIndex: 2000, width: "30px",  position: 'absolute', top: '10px', right: '12px', cursor: 'pointer'  }} id="bar" onClick={onClose} 
      icon={ faTimes } />
      {/* <div style={{zIndex: 200}}><p style={{zIndex: 200}}>{screenWidth}</p> <br/><p style={{zIndex: 200}}>{calculatedWindowScale}</p></div> */}
<p style={{zIndex: 200}}>{saveimagelocation === "cover" ? "Ladda upp omslagsbild" :  saveimagelocation === "logo" ? "Ladda upp logga" : saveimagelocation === "review" && "Ladda upp bild"}</p>
<p style={{zIndex: 200}}>{"Aspect ratio: "+uploadAspectRatio+":1"}</p>
{/*<p style={{zIndex: 200}}>{saveimagelocation === "cover" ? "(Tex: 4032x1850 px)" :  saveimagelocation === "logo" && "(Tex: 250x250 px)"}</p>
*/}

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >

        
        <input
        className='purchasebuttons' 
        style={{zIndex: 200,  display: 'block', position: "relative",
        margin: '0 auto',  }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
         
        />

        
        {imageFile && (
          <div style={{width: screenWidth > 600? screenWidth*0.75 : screenWidth*0.94, backgroundColor: "#dadada", position: "relative"  }} //transform: `scale(${calculatedWindowScale})`      style={{ transform: uploadAspectRatio === 1 ? 'scale(1)' : (uploadAspectRatio === 2.18 && 'scale(0.5)') }}
          >
            <div style={{ zIndex: 100, transform: `scale(${calculatedWindowScale})`, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  height: screenWidth < 1200 ? "320px" : "450px", //marginTop: "-200px", magrinBottom: "-200px"
                  }}>
            <AvatarEditor
            ref={editorRef}
            image={imageFile}
            width={uploadAspectRatio === 1 ? (saveimagelocation === "review"? 700 : saveimagelocation === "logo" && 350 )  : (uploadAspectRatio === 2.18 && 1400)}
            height={uploadAspectRatio === 1 ? (saveimagelocation === "review"? 700 : saveimagelocation === "logo" && 350 ) : (uploadAspectRatio === 2.18 && 1400/uploadAspectRatio)}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={editorScale}
            position={editorPosition}
            onPositionChange={handlePositionChange}
            style={{ 
              maxHeight:  saveimagelocation === "cover" ? "auto" : saveimagelocation === "logo" ?  (screenWidth < 500 ? "250px" : "320px")  : saveimagelocation === "review" &&  screenWidth > 1200  ?"450px" : screenWidth < 500 ? "250px" : "320px" , 
              maxWidth: saveimagelocation === "cover" ? "auto" : saveimagelocation === "logo" ? (screenWidth < 500 ? "250px" : "320px")  : saveimagelocation === "review" &&  screenWidth > 1200  ?"450px" : screenWidth < 500 ? "250px" : "320px" ,}}

            //style={{ marginTop: "-200px", magrinBottom: "-200px"}}
          />
          </div></div>
        )}
        <div>
          {/* Add controls for adjusting scale and position */}
        </div>
       

        {imageFile && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-15px',  zIndex: 200, }}>
          <button onClick={onClose} className='purchasebuttons'>Cancel</button>
          <button onClick={handleSave} className='purchasebuttons' style={{ backgroundColor: 'var(--primarycolor)', color: 'white' }}>Save</button>
        </div>
       )}
      </div>
    </Modal>
  );
};

export default ImageEditPopup;




