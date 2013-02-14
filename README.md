Editable Image Field
====================

**== Please note, this is still being updated and uploaded. It's ported out of an application I built, so I'm still extracting tests and verifying it can be just dropped into an application ==**

To use, include the 'editable-image-field.js' file, and make sure the 'uploadify' folder is in your site root. Also, you'll need to include the jquery.uploadify-3.1.min.js and uploadify.css files in the pages where you want to use the image field.

Simple example to get started, more coming soon:

    <label>Logo</label>
    <span editable-image-field src="app.logo_url"></span>

Where the 'app' is your data object and 'logo_url' is the property containing the url or source of the image you want to maintain.

This will generate a field containing an image preview (if the src is already populated), an 'Upload images' button, and a standard text field for inputting your own url. Please note, if the src is initially populated, the upload and url fields will be hidden. Click on the image to change it, or click the 'X' in the top right corner to clear it.

After initialized (or if the src value changes), EIF will attempt to validate that the source image can be loaded. If it fails to load, it will display a warning and offer the ability to clear the src and try again.
