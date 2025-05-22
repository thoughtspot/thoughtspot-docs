= Set up recording for Replay Search
:last_updated: 12/30/2020
:linkattrs:

You can use the recording to create training for your users on how to search your own data.

Recording a search replay requires administrator privileges and a Firefox browser. You must override some of your browser security settings in order to use the ThoughtSpot application to make the recording. This is a one time setup operation. If you do not wish to do this, you can replay the search and record it using QuickTime, Camtasia, or another screen cam recording tool.

To record a search replay using ThoughtSpot:

1. While viewing a chart or table in ThoughtSpot, click the **Replay Search** icon.

     ![]({{ site.baseurl }}/images/replay_search_icon.png "The Replay Search icon")

2. Click the **Record Replay** button.

   If you do not see the button, you must log in as a user with administrator privileges.

     ![]({{ site.baseurl }}/images/record_search_replay_0.png "Record Replay button")

   A message will display, showing a URL and a domain or an IP address.

3. Make note of both of these items.

4. Open a new browser tab and go to the URL shown in the message ( for example, "about:config").

    Depending on which browser and version you are using, you may need to access the browser configurations through a menu or by typing in a different URL. Check your own browser help section for information on how to access the browser configuration settings, if necessary.

     ![]({{ site.baseurl }}/images/record_search_replay_1.png "Record Search message")

     You may see a message warning that you are about to override the browser settings.

5. If you trust yourself, click "I'll be careful, I promise!".

     ![]({{ site.baseurl }}/images/record_search_replay_2.png "Browser warning message")

6. Find the setting for **media.getusermedia.screensharing.allowed_domains**, and add the domain used by ThoughtSpot.

    This domain will be the same one you made note of from the **Cannot record screen** message.

     ![]({{ site.baseurl }}/images/record_search_replay_3.png "Set the domain for screensharing")

7. If you see a message asking if you'd like to share your screen with the IP address or domain name of ThoughtSpot, select **Entire screen**.

     ![]({{ site.baseurl }}/images/record_search_replay_4.png "Select entire screen")

8. When the search replay has been recorded, you can see a confirmation. Select **Download**.

     ![]({{ site.baseurl }}/images/record_search_replay_5.png "Download the recorded search")

9. Save the recording on your computer by selecting **Save File** and clicking **OK**.

     ![]({{ site.baseurl }}/images/record_search_replay_6.png "Record Search save file")
