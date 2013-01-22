Editable Image Field
====================

**== Please note, this is still being updated and uploaded. It's ported out of an application I built, so I'm still extracting tests and verifying it can be just dropped into an application ==**

Simple example to get started, more coming soon:

    <label>Logo</label>
    <span editable-image-field src="app.logo_url"></span>

Where the 'app' is your data object and 'logo_url' is the property containing the url or source of the image you want to maintain.

This will generate a field containing an image preview (if the src is already populated), an 'Upload images' button, and a standard text field for inputting your own url. Please note, if the src is initially populated, the upload and url fields will be hidden. Click on the image to change it, or click the 'X' in the top right corner to clear it.

Known Issues
============
* If the src field is populated, but the image can't be loaded, Chrome just displays an empty box (known bug in Chrome that doesn't handle 'alt' text properly)
* 'Clear' button doens't come properly styled (extracting those styles from the original app, that's coming soon)