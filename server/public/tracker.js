

(
    function() {

        function getSessionId() {
            let sessionId = localStorage.getItem("session_id");

            if(!sessionId){
                sessionId = crypto.randomUUID();
                localStorage.setItem("session_id",sessionId);
            }
            return sessionId; 

        }

        async function sendEvent(eventData){
            try{
              await fetch("https://user-analytics-1-vts3.onrender.com/api/events",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(eventData),
              })
            }
            catch(error){
                     console.error("Event Tracking Error :",error)
            }
        }

        function trackPageView() {
            const eventData = {
                session_id : getSessionId(),
                event_type:"page_view",
                page_url:window.location.href, 
                timestamp:new Date(),
                metadata:{
                    user_agent:navigator.userAgent, 
                    referrer:document.referrer||null, 
                    viewport_width:window.innerWidth, 
                    viewport_height:window.innerHeight,
                }
            }
            sendEvent(eventData)
        }

        function trackClick(event){
            const eventData = {
                session_id:getSessionId(), 
                event_type:"click",
                page_url:window.location.href,
                timestamp:new Date(),
            
                click_position:{
                    x:event.clientX,
                    y:event.clientY
                },
                metadata:{
                    user_agent:navigator.userAgent, 
                    referrer:document.referrer||null,
                    viewport_width:window.innerWidth, 
                    viewport_height:window.innerHeight
                }
            }
            sendEvent(eventData)
        }
        window.addEventListener("load",trackPageView),
        document.addEventListener('click',trackClick);
    }
)();
