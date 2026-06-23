const Event = require("../models/EventModel")

exports.trackEvent = async(req,res) =>{
      try{
 const {session_id, event_type,page_url,timestamp,click_position,metadata} = req.body ;
        if(!session_id ||!event_type ||!page_url){
            return res.status(400).json({
                succss:false,
                message:"session_id,event_type and page_url are required"
            })
        } 

        if(event_type=== 'click' && (!click_position || click_position.x === undefined || click_position.y === undefined)){
            return res.status(400).json({
                success:false,
                message:"click coordinates are requried for click events"
            })
        }

        const event = await Event.create({
            session_id,
            event_type,
            page_url,
            timestamp,
            click_position,
            metadata,

        })

        return res.status(201).json({
            success:true,
            event
        })

      }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
      }
}

exports.getHeatmapData = async (req, res) => {
  try {
    const { page_url } = req.query;

    const clicks = await Event.find({
      page_url,
      event_type: "click",
    }).select("click_position -_id");

    res.status(200).json({
      success: true,
      clicks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPages = async (req, res) => {
  try {
    const pages = await Event.distinct("page_url");

    res.status(200).json({
      success: true,
      pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};