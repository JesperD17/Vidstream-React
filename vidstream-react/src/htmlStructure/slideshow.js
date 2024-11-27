import '../css/slideshow.css'

function Slideshow() {
  return (
      <div className="output cards"> {/* Slideshow & Optamized html / load in api */}
      <div className="btns">
        <button className="slide_left">
            <i className='bx bxs-chevron-left'></i>
        </button>
        <button className="slide_right">
            <i className='bx bxs-chevron-right' ></i>
        </button>
      </div>
    </div>
    
  );
}

export default Slideshow;