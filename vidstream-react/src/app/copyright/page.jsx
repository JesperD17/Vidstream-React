import "./Copyright.css";

function Copyright() {

    var titleText = [
        "1. Copyright & Ownership",
        "2. Fair Use Disclaimer",
        "3. API & Third-Party Content",
        "4. Limitation of Liability",
        "5. Contact Information"
    ]

    var innerText = [
        "All content displayed on this website, including but not limited to text, images, logos, and graphics, is the property of its respective owners. The movie data provided through this website is sourced from an API developed by us, and we do not claim ownership of any movie-related metadata, posters, or other media content.",
        "This website is intended for informational and personal use only. We do not host, stream, or distribute copyrighted content. Any movie information displayed is for reference purposes and remains the intellectual property of its rightful owners.",
        "The movie data displayed on this site is retrieved from our proprietary API. We strive to ensure the accuracy and reliability of this data; however, we do not guarantee its completeness or correctness. If you are a copyright holder and have concerns about any displayed content, please contact us for immediate resolution.",
        "We disclaim all liability for any errors, inaccuracies, or omissions in the movie data provided. By using this website, you acknowledge that we do not guarantee the completeness or correctness of any information displayed.",
        "If you have any copyright concerns or inquiries regarding content on this website, please contact us at drenzo.dev@gmail.com."
    ]

const sourceObj = {
        title: titleText,
        text: innerText
    }
    var sourceObjLength = sourceObj.title.length
    
    const repeatSources = new Array(sourceObjLength).fill(null);

    return (
        <>
            <div id="Empty">
                <div className="copyWrapper">
                    <div className="copyMainTitle">Copyright Notice</div>
                    <div className="copyMainDate">Last updated: 23 March 2025 Jesper Drent</div>
                    {repeatSources.map((_, number) => (
                        <div className="Text_ImageWrapper" key={number}>
                            <div id="textBox">
                                <div className="textWrapper">
                                    <div className="title">{sourceObj.title[number]}</div>
                                    <div className="text">{sourceObj.text[number]}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="copyLine"></div>
                    <div className="rightsReserved">© 2025 Vidstream Nextjs. All Rights Reserved.</div>
                </div>
            </div>
        </>
    )
}

export default Copyright;