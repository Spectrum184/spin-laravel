/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/exports/exports.js":
/*!*****************************************!*\
  !*** ./resources/js/exports/exports.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var $ = document.querySelector.bind(document);\nvar $$ = document.querySelectorAll.bind(document);\nvar inputProNo = $(\"#form-add-location\");\nvar btnDeleteLocation = $$(\".btn-delete\");\nvar btnConfirmDelete = $(\"#btnConfirmDelete\");\nvar app = {\n  // handle event of app\n  handleEvent: function handleEvent() {\n    var _this = this; // map enter key to tab key\n\n\n    if (inputProNo) {\n      inputProNo.onkeydown = function (event) {\n        if (event.keyCode === 13 && event.target.nodeName === \"INPUT\") {\n          var form = event.target.form;\n          var index = Array.prototype.indexOf.call(form, event.target);\n          form.elements[index + 1].focus();\n          event.preventDefault();\n        }\n      };\n    }\n\n    if (btnDeleteLocation) {\n      this.bindActionForButton(btnDeleteLocation);\n    }\n\n    if (btnConfirmDelete) {\n      btnConfirmDelete.onclick = function () {\n        var id = $(\"#idProductLocation\").innerText;\n        var form = $(\"#form-\" + id);\n        form.submit();\n      };\n    }\n  },\n  bindActionForButton: function bindActionForButton(listBtn) {\n    listBtn.forEach(function (btn) {\n      var id = btn.id;\n\n      btn.onclick = function () {\n        $(\"#idProductLocation\").innerText = id;\n      };\n    });\n  },\n  start: function start() {\n    this.handleEvent();\n  }\n};\napp.start();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZXhwb3J0cy9leHBvcnRzLmpzP2MxOTQiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJpbmQiLCIkJCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFByb05vIiwiYnRuRGVsZXRlTG9jYXRpb24iLCJidG5Db25maXJtRGVsZXRlIiwiYXBwIiwiaGFuZGxlRXZlbnQiLCJfdGhpcyIsIm9ua2V5ZG93biIsImV2ZW50Iiwia2V5Q29kZSIsInRhcmdldCIsIm5vZGVOYW1lIiwiZm9ybSIsImluZGV4IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsImVsZW1lbnRzIiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCIsImJpbmRBY3Rpb25Gb3JCdXR0b24iLCJvbmNsaWNrIiwiaWQiLCJpbm5lclRleHQiLCJzdWJtaXQiLCJsaXN0QnRuIiwiZm9yRWFjaCIsImJ0biIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVY7QUFDQSxJQUFNRyxFQUFFLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFYO0FBRUEsSUFBTUssVUFBVSxHQUFHTixDQUFDLENBQUMsb0JBQUQsQ0FBcEI7QUFDQSxJQUFNTyxpQkFBaUIsR0FBR0gsRUFBRSxDQUFDLGFBQUQsQ0FBNUI7QUFDQSxJQUFNSSxnQkFBZ0IsR0FBR1IsQ0FBQyxDQUFDLG1CQUFELENBQTFCO0FBRUEsSUFBTVMsR0FBRyxHQUFHO0FBQ1I7QUFDQUMsYUFBVyxFQUFFLHVCQUFXO0FBQ3BCLFFBQU1DLEtBQUssR0FBRyxJQUFkLENBRG9CLENBRXBCOzs7QUFDQSxRQUFJTCxVQUFKLEVBQWdCO0FBQ1pBLGdCQUFVLENBQUNNLFNBQVgsR0FBdUIsVUFBU0MsS0FBVCxFQUFnQjtBQUNuQyxZQUFJQSxLQUFLLENBQUNDLE9BQU4sS0FBa0IsRUFBbEIsSUFBd0JELEtBQUssQ0FBQ0UsTUFBTixDQUFhQyxRQUFiLEtBQTBCLE9BQXRELEVBQStEO0FBQzNELGNBQUlDLElBQUksR0FBR0osS0FBSyxDQUFDRSxNQUFOLENBQWFFLElBQXhCO0FBQ0EsY0FBSUMsS0FBSyxHQUFHQyxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCQyxJQUF4QixDQUNSTCxJQURRLEVBRVJKLEtBQUssQ0FBQ0UsTUFGRSxDQUFaO0FBSUFFLGNBQUksQ0FBQ00sUUFBTCxDQUFjTCxLQUFLLEdBQUcsQ0FBdEIsRUFBeUJNLEtBQXpCO0FBQ0FYLGVBQUssQ0FBQ1ksY0FBTjtBQUNIO0FBQ0osT0FWRDtBQVdIOztBQUVELFFBQUlsQixpQkFBSixFQUF1QjtBQUNuQixXQUFLbUIsbUJBQUwsQ0FBeUJuQixpQkFBekI7QUFDSDs7QUFFRCxRQUFJQyxnQkFBSixFQUFzQjtBQUNsQkEsc0JBQWdCLENBQUNtQixPQUFqQixHQUEyQixZQUFXO0FBQ2xDLFlBQU1DLEVBQUUsR0FBRzVCLENBQUMsQ0FBQyxvQkFBRCxDQUFELENBQXdCNkIsU0FBbkM7QUFDQSxZQUFNWixJQUFJLEdBQUdqQixDQUFDLENBQUMsV0FBVzRCLEVBQVosQ0FBZDtBQUVBWCxZQUFJLENBQUNhLE1BQUw7QUFDSCxPQUxEO0FBTUg7QUFDSixHQS9CTztBQWlDUkoscUJBQW1CLEVBQUUsNkJBQVNLLE9BQVQsRUFBa0I7QUFDbkNBLFdBQU8sQ0FBQ0MsT0FBUixDQUFnQixVQUFBQyxHQUFHLEVBQUk7QUFDbkIsVUFBTUwsRUFBRSxHQUFHSyxHQUFHLENBQUNMLEVBQWY7O0FBRUFLLFNBQUcsQ0FBQ04sT0FBSixHQUFjLFlBQVc7QUFDckIzQixTQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QjZCLFNBQXhCLEdBQW9DRCxFQUFwQztBQUNILE9BRkQ7QUFHSCxLQU5EO0FBT0gsR0F6Q087QUEyQ1JNLE9BQUssRUFBRSxpQkFBVztBQUNkLFNBQUt4QixXQUFMO0FBQ0g7QUE3Q08sQ0FBWjtBQWdEQUQsR0FBRyxDQUFDeUIsS0FBSiIsImZpbGUiOiIuL3Jlc291cmNlcy9qcy9leHBvcnRzL2V4cG9ydHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KTtcclxuY29uc3QgJCQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpO1xyXG5cclxuY29uc3QgaW5wdXRQcm9ObyA9ICQoXCIjZm9ybS1hZGQtbG9jYXRpb25cIik7XHJcbmNvbnN0IGJ0bkRlbGV0ZUxvY2F0aW9uID0gJCQoXCIuYnRuLWRlbGV0ZVwiKTtcclxuY29uc3QgYnRuQ29uZmlybURlbGV0ZSA9ICQoXCIjYnRuQ29uZmlybURlbGV0ZVwiKTtcclxuXHJcbmNvbnN0IGFwcCA9IHtcclxuICAgIC8vIGhhbmRsZSBldmVudCBvZiBhcHBcclxuICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gbWFwIGVudGVyIGtleSB0byB0YWIga2V5XHJcbiAgICAgICAgaWYgKGlucHV0UHJvTm8pIHtcclxuICAgICAgICAgICAgaW5wdXRQcm9Oby5vbmtleWRvd24gPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzICYmIGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gXCJJTlBVVFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBldmVudC50YXJnZXQuZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZWxlbWVudHNbaW5kZXggKyAxXS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYnRuRGVsZXRlTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kQWN0aW9uRm9yQnV0dG9uKGJ0bkRlbGV0ZUxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChidG5Db25maXJtRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGJ0bkNvbmZpcm1EZWxldGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAkKFwiI2lkUHJvZHVjdExvY2F0aW9uXCIpLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSAkKFwiI2Zvcm0tXCIgKyBpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJpbmRBY3Rpb25Gb3JCdXR0b246IGZ1bmN0aW9uKGxpc3RCdG4pIHtcclxuICAgICAgICBsaXN0QnRuLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBidG4uaWQ7XHJcblxyXG4gICAgICAgICAgICBidG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNpZFByb2R1Y3RMb2NhdGlvblwiKS5pbm5lclRleHQgPSBpZDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnQoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmFwcC5zdGFydCgpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/exports/exports.js\n");

/***/ }),

/***/ 1:
/*!***********************************************!*\
  !*** multi ./resources/js/exports/exports.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\spin-laravel\resources\js\exports\exports.js */"./resources/js/exports/exports.js");


/***/ })

/******/ });