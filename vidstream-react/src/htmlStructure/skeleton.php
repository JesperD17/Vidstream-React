<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <link rel="icon" href="../pics/Logo Icon2.png" class="-">
    <link rel="stylesheet" href="../css/general.css" class="remove">
    <link rel="stylesheet" href="../css/skeleton_homepage.css" class="remove">
    <link rel="stylesheet" href="../css/header.css" class="remove">
    <link rel="stylesheet" href="../css/homepage.css" class="remove">
    <link rel="stylesheet" href="../css/footer.css" class="remove">
    <title class="loader">.</title>
</head>
<body>
    
    <div id="shell2">
        <div class="loader_alignment">
            <div class="loader"></div>
        </div>  
        
        <div class="output">
            <div class="${cardClass}">
                <div class="${bannerClass}">
                    <img src="${movie.banner}" alt="${movie.title} banner"/>
                    <div class="img_front_color">
                        <div class="slide-card_info">
                            <div class="slide-titles">${index + 1}. ${movie.title}</div>
                            <div class="slide-release_date">${movie.year}</div>
                            <div class="slide-ratings">${movie.rating}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="btns">    
                <button class="slide_left">
                    <i class='bx bxs-chevron-left'></i>
                </button>
                <button class="slide_right">
                    <i class='bx bxs-chevron-right' ></i>
                </button>
            </div>
        </div>
        
        <!-- <div class="Card">
            <div class="movie-banner">
                <img class="poster"/>
            </div>
            <div class="card_info">
                <div class="titles">${index + 1}. ${movie_serie.title}</div>
                <div class="rating_release">
                    <div class="release_date">${movie_serie.stats.year}</div>
                    <div class="seasons">${movie_serie.stats.seasons}</div>
                    <div class="duration">${movie_serie.stats.duration}</div>
                    <div class="ratings">${movie_serie.stats.rating} <i class='bx bxs-star-half'></i></div>
                </div>
            </div>
        </div> -->
    </div>
    
    <div class="skeleton"></div>
    <!-- <div class="output"></div> -->
</body>
</html>

<script src="../js/skeletonJs/skeleton.js"></script>
<!-- <script src="../js/html_Optamized.js"></script> -->

<!-- <script src="../js/loader.js"></script> -->
