/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import { githubSvg, linkedInSvg } from "./_utils";

export const htmlLayout = `
<div class="container" tabindex="0" id='main_content3'>
    <rounded-images></rounded-images>
    <div class="content-description">
        <h1>Alexzander Purwoko Widiantoro</h1>
        <h2>Technology Enthusiasts</h2>
        <p>Iam a people who highly enthusiastic in IT, learner and have a passion in programming. Since
        2014, I study more about programming. Now, I hava a skills on Android & Web Development, and have an enthusiasts 
        on IoT Technologies. Finally, thanks to Dicoding Indonesia that give me some class for upskilling :) 
        <div class="button-layout">
            <button>${linkedInSvg}LinkedIn</button>
            <button>${githubSvg}GitHub</button>
        </div>
    </div>
    
</div>
`;