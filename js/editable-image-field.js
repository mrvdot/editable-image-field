angular.module('editable-image-field',['mvd-uploadify'])
  .directive('editableImageField',['$http','$timeout',function($http, $timeout) {
    var tpl = '<div ng-hide="loadFailed"><div class="preview">' + 
      '<span class="clear" title="Clear image" ng-click="clearImage()">&times;</span>'+
      '<img title="Click to change" ng-src="{{src}}" alt="It appears that your selected image is not loading, click here to update it" /></div>' + 
      '<div class="set-src"><span uploadify uploadify-directory="uploadify/" mvd-options="{ onUploadSuccess : \'updateSrc\'}" ></span>' + 
      '<label>Or set url:</label><input ng-model="src" type="text"/></div></div>' + 
      '<div ng-show="loadFailed">' + 
        '<p class="alert">The image you\'ve specified doesn\'t appear to be loading successfully, click <a ng-click="clearImage()">here</a> to clear it and try a new image.<span ng-show="retrying"><br />Retrying image...</span></p>' + 
      '</div>';
    return {
      template : tpl,
      scope : {
        src : '=src'
      },
      link : function($scope,$el,$attrs) {
        $scope.loadFailed = false;
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

        var checkCount = 0;

        var checkThreshold = $attrs.retryLimit || 3;

        var validateSrc = $attrs.validateSrc || true;
        var validationTimeout;

        $scope.$watch('src',function(nv,ov) {
          $scope.loadFailed = false;
          checkCount = 0;
          if(nv) {
            $setSrc.hide();
            $preview.show();
          } else {
            $preview.hide();
            $setSrc.show();
          }
          if(nv && validateSrc) {
            validationTimeout = $timeout(function() {
              validateExists(nv);
            },1000);
          }
        });


        var validateExists = function(src) {
          checkCount++;
          var img = jQuery('<img src="' + src + '" style="position:relative; left:-9999px; padding: 0; margin : 0;" />').appendTo('body');
          $scope.loadFailed = !((img.height() > 0) && (img.width() > 0));
          img.remove();
          if($scope.loadFailed && checkCount < checkThreshold) {
            $scope.retrying = true;
            validationTimeout = $timeout(function() {
              validateExists(src);
            },2000);
          } else {
            $scope.retrying = false;
          }
        }

        $scope.updateSrc = function(file, src) {
          $scope.$apply(function() {
            $scope.src = src;  
          });
          $setSrc.slideUp();
          $preview.slideDown();
        };

        $scope.clearImage = function() {
          if(validationTimeout) {
            $timeout.cancel(validationTimeout);
          }
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
          if(response == 'UPLOAD_FAILED') return;//trigger onUploadError
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

