const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



const mouseSkew = () => {
    let timeout = 0;
    let xpoint = 1;
    let ypoint = 1;

    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", (dets) => {
        // const xdiff = dets.clientX - xprev;
        // const ydiff = dets.clientY - yprev;

        clearTimeout(timeout);

        xpoint = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
        ypoint = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        mouseMover(xpoint, ypoint);

        timeout = setTimeout(()=>{
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100)
    })
}

const mouseMover = (xpoint,ypoint) => {
    window.addEventListener("mousemove", (dets)=>{
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xpoint}, ${ypoint})`;
    })
}

const InfoAnim = ()=>{
    let tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
        stagger: .2,
    })
    .from("#hfooter", {
        y: '-10',
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
    })
}


const imageHoverEffect = () => {



    document.querySelectorAll(".elem").forEach((elem) => {

        let rotate = 0;
        let diff = 0;
        elem.addEventListener("mousemove", (dets) => {
            let diffY = dets.clientY - elem.getBoundingClientRect().top;
            let diffX = dets.clientX - elem.getBoundingClientRect().left;
            let img = elem.querySelector("img");
            diff = dets.clientX - rotate;
            rotate = dets.clientX;
    
            gsap.to(img, {
                opacity: 1,
                ease: "power3",
                top: diffY - img.clientHeight / 2,
                left: diffX - img.clientWidth / 2,
                rotate: gsap.utils.clamp(-20,20, diff)
            });
        });
    });
    

}

const imageHoverEffectLeave = () => {


    document.querySelectorAll(".elem").forEach((elem) => {
        elem.addEventListener("mouseleave", (dets) => {  
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                ease: "power3",
                duration: 1,
            });
        });
    });
    

}


imageHoverEffectLeave();
imageHoverEffect();
mouseSkew();
mouseMover();
InfoAnim();