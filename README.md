# jquery.bgpin

### A jQuery plugin for pinnig backgrounds

This plugin allows for full screen background images to stay fixed and fade in and out as you scroll through sections on a page. Adds a nice touch to a page such as a blog post or informational page where plain ol moving backgorunds just won't cut it.

## Usage

1. Include jQuery and plugin:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="js/jquery.bgpin.js"></script>
	```

2. Include HTML code:

	```html
	<div class="bgpin-group"><!-- the parent container -->
		<div class="bgpin-single your-bgpin-single-first-background"><!-- add as many as you like -->
			<div class="bgpin-single-content">
				<!-- your content here, style as you like -->
			</div><!-- /.bgpin-single-content -->
		</div><!-- /.bgpin-single -->
		
		another added like above (need at least two for the effect to work)
		<div class="bgpin-single your-bgpin-single-second-background">...

	</div><!-- /.bgpin-group -->
	```

3. Include CSS:
	```css
	.bgpin-group {
		min-height: 100%;
		position: relative;
		width: 100%;
	}
	.bgpin-single{
		background-size: cover;
		height: 100vh;
		position: relative;
		width: 100%;
	}
	
	add your background images 
	
	.your-bgpin-single-first-background {
		background-image: url('path-to-your-image');
	}
	.your-bgpin-single-second-background {
		background-image: url('path-to-your-image');
	}
	```

4. Call the plugin:

	```javascript
	$('.bgpin-group').bgpin()
	```

## demo
<a href="http://eljamez.com/bgpin/">View the live demo.</a>
