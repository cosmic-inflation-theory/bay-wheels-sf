
🚲 BayGlide: Bay Wheels e-bike availability
Will there be an e-bike at my station when I get there?

BayGlide is my personal project that answers that question for SF's Bay Wheels. It watches bike counts all day, learns the daily patterns, and shows you live numbers, forecasts, and a map.

🌐 Live site: https://cosmic-inflation-theory.github.io/bay-wheels-sf/

Unofficial. Not affiliated with or endorsed by Lyft or Bay Wheels.

✨ What it shows
Feature	What you get
Nearest stations	Live e-bike counts at your 3 closest stations
Live map	All ~380 San Francisco stations, tap one for details
Forecast charts	Expected e-bikes hour by hour for each station
Typical day	A time-lapse slider showing how a normal day looks
Closed stations	Stations that are temporarily closed are marked gray, and stations that rarely have e-bikes get a badge
Trip planner (plan.html)	Pick a start point and departure time, and see which nearby stations are most likely to have an e-bike then
🗺️ How it works
  Bay Wheels public bike data (GBFS feed)
                  │   checked every 5 minutes
                  ▼
        Saved as a history of bike counts
                  │   rebuilt every night
                  ▼
     Find patterns → make forecasts → build the page
                  │
                  ▼
            This website (GitHub Pages)
Collect. Every 5 minutes the project records how many bikes are at every station.
Learn. Overnight it works out what a normal Monday, Tuesday, and so on looks like for each station.
Forecast. It predicts the coming hours from the pattern plus what's happening right now.
Publish. It rebuilds this site with fresh numbers.
🔮 How the forecast works
The forecast is intentionally simple. It starts from what's normal for that station at that hour, then adjusts for how far today is from normal. The adjustment fades the further ahead you look:

prediction = typical value for that hour
           + (how far we are from typical right now) × 0.5^(distance / 6)
So if a station is unusually empty right now, the forecast expects it to drift back toward normal over the next several hours.

Why not machine learning? A machine-learning model was tried and compared. It only improved accuracy by about 5.6%, well short of the 15% needed to justify using it, and it made the charts less believable. The simple method won.

A few other choices:

Stations are tracked by station ID, not name, because the bike data contains duplicate station names.
If a station has no history for a time slot, the forecast falls back to the all-days average, not zero. Otherwise empty slots would show up as a false "0 bikes."
⚠️ Good to know
Forecasts are estimates. They show what usually happens, not a guarantee.
Data is about 5 minutes old at best. For the freshest count, check the Lyft app.
You can't reserve a bike from this site. Bay Wheels' public data is read-only. It shows what's available but offers no way to hold a bike.
No push notifications. Phone alerts and saved trip reminders are currently switched off, so the trip planner is for ranking stations only.
Gaps can happen. The data is collected from a personal computer, so a sleep or an outage can leave short gaps.
📄 Data source
Bike and station data comes from Bay Wheels' public GBFS feed, the open standard that bike-share systems use to publish live availability.

🙋 About
A personal project built for learning and everyday use. Feedback and ideas are welcome. Please open an issue.

