angular.module('editable-image-field',['mvd-uploadify'])
  .directive('editableImageField',[function() {
    var tpl = '<div class="preview">' + 
      '<span class="clear" title="Clear image" ng-click="clearImage()">&times;</span>'+
      '<img title="Click to change" ng-src="{{src}}" alt="It appears that your selected image is not loading, click here to update it" /></div>' + 
      '<div class="set-src"><span uploadify uploadify-directory="uploadify/" mvd-options="{ onUploadSuccess : \'updateSrc\'}" ></span>' + 
      '<label>Or set url:</label><input ng-model="src" type="text"/></div>';
    return {
      template : tpl,
      scope : {
        src : '=src'
      },
      link : function($scope,$el,$attrs) {
        $el.addClass('editable-image-field');
        var $setSrc = $el.find('.set-src');
        var $preview = $el.find('.preview').on('click',function() {
          $preview.slideUp();
          $setSrc.slideDown();
        });

        if($scope.src) {
          $setSrc.hide();  
        } else {
          $preview.hide();
        }
        $scope.$watch('src',function(nv,ov) {
          if(nv && !ov) {
            $setSrc.hide();
            $preview.show();
          } else if(!nv && ov) {
            $preview.hide();
            $setSrc.show();
          }
        });
        $scope.updateSrc = function(file, src) {
          $scope.$apply(function() {
            $scope.src = src;  
          });
          $setSrc.slideUp();
          $preview.slideDown();
        };

        $scope.clearImage = function() {
          $scope.src = null;
        }
      }
    }
  }]);

angular.module('mvd-uploadify',[])
  .directive('uploadify',[function() {
    return {
      link : function($scope,$el,$attrs) {
        var muId = 'mvd-uploadify-' + $scope.$id;
        $el.append('<input type="file" class="uploadify" id="' + muId + '" />');
        var directory = $attrs.uploadifyDirectory || '';
        var muOptions = $attrs.mvdOptions ? $scope.$eval($attrs.mvdOptions) : {};
        var userUploadSuccess = muOptions.onUploadSuccess || false;
        var onUploadStart = function() {

        };

        var onUploadComplete = function() {

        };

        var onUploadSuccess = function(file,response) {
          if(userUploadSuccess && typeof($scope[userUploadSuccess]) === 'function') {
            $scope[userUploadSuccess](file,response);
          }
        };
        var defaults = {
          'swf' : directory + 'uploadify.swf',
          'uploader' : directory + 'uploadify.php',
          'onUploadStart' : onUploadStart,
          'onUploadComplete' : onUploadComplete,
          'onUploadSuccess' : onUploadSuccess
        };
        angular.extend(muOptions,defaults);
        var muEl = $el.find('input');
        muEl.uploadify(muOptions);
      }
    }
  }]);

