import '../css/slideshow.css'

function Slideshow() {
  return (
      <div class="output cards"> {/* Slideshow & Optamized html / load in api */}
      <div class="btns">
        <button class="slide_left">
            <i class='bx bxs-chevron-left'></i>
        </button>
        <button class="slide_right">
            <i class='bx bxs-chevron-right' ></i>
        </button>
      </div>
    </div>
    
  );
}

export default Slideshow;