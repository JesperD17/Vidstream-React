
<!DOCTYPE html>
<html>
  
  <head>
    <title>Vidstream</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="../css/general.css">
    <link rel="stylesheet" href="../css/homepage.css">
    <link rel="icon" type="image/x-icon" href="../pics/Logo Icon2.png">
    <script src="../js/load_in_API_homepage.js" type="module"></script>
  </head>
  
<body>
  <div class= "skeleton_style">
    <?php include('skeleton.php') ?>
  </div>

<div id="shell">
  
    <!-- Header -->
    <div id="header">
      <?php include('header.html') ?>
    </div>


    <!-- Slideshow & Optamized html / load in api -->
    <div class="output cards">
      <div class="btns">
        <button class="slide_left">
            <i class='bx bxs-chevron-left'></i>
        </button>
        <button class="slide_right">
            <i class='bx bxs-chevron-right' ></i>
        </button>
      </div>
    </div>
    
    <!-- Headers & text & movies, series etc. -->
    
    <div id="main"></div>

  <!-- Footer -->
  <?php include('footer.html') ?>
  

</div>
  <!-- End shell -->

</body>

</html>

<script src="../js/allPagesJs/collapsibleContent.js"></script>
<script src="../js/allPagesJs/scrollableContent.js"></script>
<!-- <script src="../js/html_Optamized.js"></script> -->
<!-- <script src="../js/html_includeAll_html.js"></script> -->

