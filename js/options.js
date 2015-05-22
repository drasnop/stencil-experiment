state.options = {
   "language": {
      "id": "language",
      "label": "Language",
      "instructions": "Change the language to",
      "value": "en_US",
      "values": [{
         "name": "en_US",
         "label": "English"
      }],
      "notInExperiment": true
   },
   "date_format": {
      "id": "date_format",
      "label": "Date Format",
      "instructions": "Change the date format to",
      "value": "DD.MM.YYYY",
      "values": [{
         "name": "DD.MM.YYYY",
         "label": "DD.MM.YYYY"
      }, {
         "name": "MM/DD/YYYY",
         "label": "MM/DD/YYYY"
      }, {
         "name": "DD/MM/YYYY",
         "label": "DD/MM/YYYY"
      }, {
         "name": "YYYY/MM/DD",
         "label": "YYYY/MM/DD"
      }, {
         "name": "YYYY-MM-DD",
         "label": "YYYY-MM-DD"
      }]
   },
   "time_format": {
      "id": "time_format",
      "label": "Time Format",
      "instructions": "Change the time format to",
      "value": "12 hour",
      "values": [{
         "name": "12 hour",
         "label": "12 hour"
      }, {
         "name": "24 hour",
         "label": "24 hour"
      }]
   },
   "start_of_week": {
      "id": "start_of_week",
      "label": "Start of the Week",
      "instructions": "Change the first day of the week to be",
      "value": "sun",
      "values": [{
         "name": "sat",
         "label": "Saturday"
      }, {
         "name": "sun",
         "label": "Sunday"
      }, {
         "name": "mon",
         "label": "Monday"
      }]
   },
   "sound_checkoff_enabled": {
      "id": "sound_checkoff_enabled",
      "label": "Enable sound for checking-off an item",
      "instructions": "Enable sound when checking-off a todo",
      "value": true,
      "values": []
   },
   "sound_notification_enabled": {
      "id": "sound_notification_enabled",
      "label": "Enable sound for new notifications",
      "instructions": "Enable sound for new notifications",
      "value": true,
      "values": []
   },
   "new_task_location": {
      "id": "new_task_location",
      "label": "Add Items",
      "instructions": "When creating a new todo, add it at the top of the current list",
      "instructionsReverse": "When creating a new todo, add it at the bottom of the current list",
      "value": "top",
      "values": [{
         "name": "top",
         "label": "Top of List"
      }, {
         "name": "bottom",
         "label": "Bottom of List"
      }]
   },
   "confirm_delete_entity": {
      "id": "confirm_delete_entity",
      "label": "Confirm before deleting items",
      "instructions": "When deleting an item, ask me for confirmation",
      "instructionsReverse": "When deleting an item, don't ask me for confirmation",
      "value": true,
      "values": []
   },
   "behavior_star_tasks_to_top": {
      "id": "behavior_star_tasks_to_top",
      "label": "Star moves item to top",
      "instructions": "When starring an item, move it to the top of the list",
      "instructionsReverse": "Do not automatically move starred items to the top of the list",
      "value": true,
      "values": []
   },
   "print_completed_items": {
      "id": "print_completed_items",
      "label": "Print completed items",
      "instructions": "When printing a todo list, print also the completed todo items",
      "instructionsReverse": "When printing a todo list, do not print the completed todo items",
      "value": false,
      "values": []
   },
   "shortcut_add_new_task": {
      "id": "shortcut_add_new_task",
      "label": "Add a New Item",
      "instructions": "Change shortcut for adding a new todo to",
      "value": "CTRL + N",
      "values": [{
         "name": "CTRL + N",
         "label": "CTRL + N"
      }, {
         "name": "CTRL + M",
         "label": "CTRL + M"
      }]
   },
   "shortcut_add_new_list": {
      "id": "shortcut_add_new_list",
      "label": "Add a New List",
      "instructions": "Change shortcut for creating a new list to ",
      "value": "CTRL + L",
      "values": [{
         "name": "CTRL + L",
         "label": "CTRL + L"
      }, {
         "name": "CTRL + K",
         "label": "CTRL + K"
      }]
   },
   "shortcut_mark_task_done": {
      "id": "shortcut_mark_task_done",
      "label": "Mark Selected Items as 'Completed'",
      "instructions": "Change shortcut for checking off todos to",
      "value": "CTRL + D",
      "values": [{
         "name": "CTRL + D",
         "label": "CTRL + D"
      }, {
         "name": "CTRL + H",
         "label": "CTRL + H"
      }]
   },
   "shortcut_mark_task_starred": {
      "id": "shortcut_mark_task_starred",
      "label": "Mark Selected Items as 'Starred'",
      "instructions": "Change shortcut for starring todos to",
      "value": "CTRL + S",
      "values": [{
         "name": "CTRL + S",
         "label": "CTRL + S"
      }, {
         "name": "CTRL + T",
         "label": "CTRL + T"
      }]
   },
   "shortcut_select_all_tasks": {
      "id": "shortcut_select_all_tasks",
      "label": "Select All Items",
      "instructions": "Change shortcut for selecting all todos to",
      "value": "CTRL + A",
      "values": [{
         "name": "CTRL + A",
         "label": "CTRL + A"
      }, {
         "name": "CTRL + Q",
         "label": "CTRL + Q"
      }]
   },
   "shortcut_delete": {
      "id": "shortcut_delete",
      "label": "Delete Selected List or Item",
      "instructions": "Change shortcut for deleting a list or a todo to",
      "value": "CTRL + BACKSPACE",
      "values": [{
         "name": "CTRL + BACKSPACE",
         "label": "CTRL + BACKSPACE"
      }, {
         "name": "SHIFT + BACKSPACE",
         "label": "SHIFT + BACKSPACE"
      }]
   },
   "shortcut_goto_search": {
      "id": "shortcut_goto_search",
      "label": "Focus Search",
      "instructions": "Change shortcut for selecting the search box to",
      "value": "CTRL + F",
      "values": [{
         "name": "CTRL + F",
         "label": "CTRL + F"
      }, {
         "name": "CTRL + G",
         "label": "CTRL + G"
      }]
   },
   "shortcut_goto_preferences": {
      "id": "shortcut_goto_preferences",
      "label": "Open Preferences",
      "instructions": "Change shortcut for opening preferences to",
      "value": "CTRL + P",
      "values": [{
         "name": "CTRL + P",
         "label": "CTRL + P"
      }, {
         "name": "CTRL + .",
         "label": "CTRL + ."
      }],
      "more": true
   },
   "shortcut_send_via_email": {
      "id": "shortcut_send_via_email",
      "label": "Email List",
      "instructions": "Change shortcut for sharing a list via email to",
      "value": "CTRL + E",
      "values": [{
         "name": "CTRL + E",
         "label": "CTRL + E"
      }, {
         "name": "CTRL + U",
         "label": "CTRL + U"
      }],
      "more": true
   },
   "shortcut_show_notifications": {
      "id": "shortcut_show_notifications",
      "label": "Show Activities",
      "instructions": "Change shortcut for showing the activities panel to",
      "value": "CTRL + SHIFT + A",
      "values": [{
         "name": "CTRL + SHIFT + A",
         "label": "CTRL + SHIFT + A"
      }, {
         "name": "CTRL + SHIFT + N",
         "label": "CTRL + SHIFT + N"
      }],
      "more": true
   },
   "shortcut_goto_inbox": {
      "id": "shortcut_goto_inbox",
      "label": "Open Inbox",
      "instructions": "Change shortcut for going to inbox to",
      "value": "CTRL + I",
      "values": [{
         "name": "CTRL + I",
         "label": "CTRL + I"
      }, {
         "name": "CTRL + 0",
         "label": "CTRL + 0"
      }],
      "more": true
   },
   "shortcut_goto_filter_assigned": {
      "id": "shortcut_goto_filter_assigned",
      "label": "Open 'Assigned to Me' Smart List",
      "instructions": "Change shortcut for showing a list of all the todos assigned to you to",
      "value": "CTRL + 1",
      "values": [{
         "name": "CTRL + 1",
         "label": "CTRL + 1"
      }, {
         "name": "SHIFT + 1",
         "label": "SHIFT + 1"
      }],
      "more": true
   },
   "shortcut_goto_filter_starred": {
      "id": "shortcut_goto_filter_starred",
      "label": "Open 'Starred' Smart List",
      "instructions": "Change shortcut for showing a list of all the todos that are starred to",
      "value": "CTRL + 2",
      "values": [{
         "name": "CTRL + 2",
         "label": "CTRL + 2"
      }, {
         "name": "SHIFT + 2",
         "label": "SHIFT + 2"
      }],
      "more": true
   },
   "shortcut_goto_filter_today": {
      "id": "shortcut_goto_filter_today",
      "label": "Open 'Today' Smart List",
      "instructions": "Change shortcut for showing a list of all the todos due today to",
      "value": "CTRL + 3",
      "values": [{
         "name": "CTRL + 3",
         "label": "CTRL + 3"
      }, {
         "name": "SHIFT + 3",
         "label": "SHIFT + 3"
      }],
      "more": true,
      "notInExperiment": true
   },
   "shortcut_goto_filter_week": {
      "id": "shortcut_goto_filter_week",
      "label": "Open 'Week' Smart List",
      "instructions": "Change shortcut for showing a list of all the todos due this week to",
      "value": "CTRL + 4",
      "values": [{
         "name": "CTRL + 4",
         "label": "CTRL + 4"
      }, {
         "name": "SHIFT + 4",
         "label": "SHIFT + 4"
      }],
      "more": true,
      "notInExperiment": true
   },
   "shortcut_goto_filter_all": {
      "id": "shortcut_goto_filter_all",
      "label": "Open 'All' Smart List",
      "instructions": "Change shortcut for showing a list of all the todos to",
      "value": "CTRL + 5",
      "values": [{
         "name": "CTRL + 5",
         "label": "CTRL + 5"
      }, {
         "name": "SHIFT + 5",
         "label": "SHIFT + 5"
      }],
      "more": true,
      "notInExperiment": true
   },
   "shortcut_goto_filter_completed": {
      "id": "shortcut_goto_filter_completed",
      "label": "Open 'Completed' Smart List",
      "instructions": "Change shortcut for showing a list of all the completed todos to",
      "value": "CTRL + 6",
      "values": [{
         "name": "CTRL + 6",
         "label": "CTRL + 6"
      }, {
         "name": "SHIFT + 6",
         "label": "SHIFT + 6"
      }],
      "more": true,
      "notInExperiment": true
   },
   "shortcut_sync": {
      "id": "shortcut_sync",
      "label": "Sync",
      "instructions": "Change shortcut for syncing with the server to",
      "value": "R",
      "values": [{
         "name": "R",
         "label": "R"
      }, {
         "name": "CTRL + Y",
         "label": "CTRL + Y"
      }]
   },
   "smartlist_visibility_assigned_to_me": {
      "id": "smartlist_visibility_assigned_to_me",
      "label": "Assigned to me",
      "instructions": "In the left sidebar, show the list of all the todos assigned to you",
      "value": "visible",
      "values": [{
         "name": "visible",
         "label": "visible"
      }, {
         "name": "hidden",
         "label": "hidden"
      }],
      "hideable": true,
      "notInExperiment": true
   },
   "smartlist_visibility_starred": {
      "id": "smartlist_visibility_starred",
      "label": "Starred",
      "instructions": "In the left sidebar, show the list of all the todos that are starred",
      "value": "visible",
      "values": [{
         "name": "visible",
         "label": "visible"
      }, {
         "name": "hidden",
         "label": "hidden"
      }],
      "hideable": true,
      "notInExperiment": true
   },
   "smartlist_visibility_today": {
      "id": "smartlist_visibility_today",
      "label": "Today",
      "instructions": "In the left sidebar, show the list of all the todos that are due today",
      "value": "visible",
      "values": [{
         "name": "visible",
         "label": "visible"
      }, {
         "name": "hidden",
         "label": "hidden"
      }],
      "hideable": true
   },
   "smartlist_visibility_week": {
      "id": "smartlist_visibility_week",
      "label": "Week",
      "instructions": "In the left sidebar, show the list of all the todos that are due this week",
      "value": "hidden",
      "values": [{
         "name": "visible",
         "label": "visible"
      }, {
         "name": "hidden",
         "label": "hidden"
      }],
      "hideable": true
   },
   "smartlist_visibility_all": {
      "id": "smartlist_visibility_all",
      "label": "All",
      "instructions": "In the left sidebar, show the list of all the todos",
      "value": "hidden",
      "values": [{
         "name": "visible",
         "label": "visible"
      }, {
         "name": "hidden",
         "label": "hidden"
      }],
      "hideable": true
   },
   "smartlist_visibility_done": {
      "id": "smartlist_visibility_done",
      "label": "Completed",
      "instructions": "In the left sidebar, show the list of all the todos that are already completed",
      "value": "visible",
      "values": [{
         "name": "visible",
         "label": "visible"
      }, {
         "name": "hidden",
         "label": "hidden"
      }],
      "hideable": true
   },
   "today_smart_list_visible_tasks": {
      "id": "today_smart_list_visible_tasks",
      "label": "Week & Today Settings",
      "instructions": "In the lists of tasks due today and this week, show all items",
      "instructionsReverse": "In the lists of tasks due today and this week, show only the todos assigned to me",
      "value": "all",
      "values": [{
         "name": "all",
         "label": "Show all items"
      }, {
         "name": "current_user",
         "label": "Only assigned to me & private"
      }]
   },
   "notifications_email_enabled": {
      "id": "notifications_email_enabled",
      "label": "Email Notifications",
      "instructions": "Enable email notifications",
      "value": true,
      "values": []
   },
   "notifications_push_enabled": {
      "id": "notifications_push_enabled",
      "label": "Push Notifications",
      "instructions": "Enable push notifications",
      "value": true,
      "values": []
   },
   "notifications_desktop_enabled": {
      "id": "notifications_desktop_enabled",
      "label": "Desktop Notifications",
      "instructions": "Enable desktop notifications",
      "value": true,
      "values": []
   }
}
