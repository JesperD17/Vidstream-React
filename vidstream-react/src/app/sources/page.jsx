import "./Sources.css";

function importAll(_) {
    return _.keys().map(_);
}

function Source() {
    // json structure
    // imports all the images

    var titleText = [
        "Figma: ",
        "Next.js: ",
        "Vercel: ",
        "CSS Loaders: ",
        "Boxicons: "
    ]

    var innerText = [
        "A collaborative interface design tool, used to conceptualize and design the user interface of this website. It helped in creating wireframes and prototypes for seamless user experience.",
        "A versatile React framework used to build this application, providing server-side rendering (SSR), static site generation (SSG), and optimized performance for a fast and seamless user experience.",
        "A powerful cloud platform for deploying and hosting web applications. This project is hosted on Vercel, leveraging its fast global CDN and seamless integration with Git for continuous deployment.",
        "Utilized for creating smooth and visually appealing loading animations that enhance user experience by providing feedback while data fetching or transitions.",
        "A vector icon library implemented across the application to add aesthetic and functional icons, ensuring a clean and professional design."
    ]

    var logoLinks = [
        "https://www.figma.com/",
        "https://nextjs.org/",
        "https://vercel.com//",
        "https://css-loaders.com/",
        "https://boxicons.com/"
    ]

    
    const sourceObj = {
        images: importAll(require.context('./images/', false, /\.(png)$/)),
        title: titleText,
        text: innerText,
        link: logoLinks
    }
    var sourceObjLength = sourceObj.title.length
    
    const repeatSources = new Array(sourceObjLength).fill(null);
    return (
        <>
            <div id="Sources">
                <div className="sourcesWrapper">
                    <div className="SourceMainTitle">This project is made using the following tools and technologies:</div>
                    {repeatSources.map((_, number) => (
                        <div className="Text_ImageWrapper" key={number}>
                            <div id="textBox">
                                <div className="textWrapper">
                                    <div className="title">{sourceObj.title[number]}</div>
                                    <div className="text">{sourceObj.text[number]}</div>
                                    {/* <div className="viewMore">More...</div> */}
                                </div>
                            </div>
                            <div className="imageWrapper">
                                <a href={sourceObj.link[number]}>
                                    <img src={sourceObj.images[number].default.src} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Source;