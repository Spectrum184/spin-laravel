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

eval("var $ = document.querySelector.bind(document);\nvar $$ = document.querySelectorAll.bind(document);\nvar inputProNo = $(\"#form-add-location\");\nvar btnDeleteLocation = $$(\".btn-delete\");\nvar btnConfirmDelete = $(\"#btnConfirmDelete\");\nvar app = {\n  // handle event of app\n  handleEvent: function handleEvent() {\n    var _this = this; // map enter key to tab key\n\n\n    if (inputProNo) {\n      inputProNo.onkeydown = function (event) {\n        if (event.keyCode === 13 && event.target.nodeName === \"INPUT\") {\n          var form = event.target.form;\n          var index = Array.prototype.indexOf.call(form, event.target);\n          form.elements[index + 1].focus();\n          event.preventDefault();\n        }\n      };\n    }\n\n    if (btnDeleteLocation) {\n      this.bindActionForButton(btnDeleteLocation);\n    }\n\n    if (btnConfirmDelete) {\n      btnConfirmDelete.onclick = function () {\n        var id = $(\"#idProductLocation\").innerText;\n        var form = $(\"#form-\" + id);\n        form.submit();\n      };\n    }\n  },\n  bindActionForButton: function bindActionForButton(listBtn) {\n    listBtn.forEach(function (btn) {\n      var id = btn.id;\n\n      btn.onclick = function () {\n        $(\"#idProductLocation\").innerText = id;\n      };\n    });\n  },\n  start: function start() {\n    this.handleEvent();\n  }\n};\napp.start();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZXhwb3J0cy9leHBvcnRzLmpzP2MxOTQiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJpbmQiLCIkJCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFByb05vIiwiYnRuRGVsZXRlTG9jYXRpb24iLCJidG5Db25maXJtRGVsZXRlIiwiYXBwIiwiaGFuZGxlRXZlbnQiLCJfdGhpcyIsIm9ua2V5ZG93biIsImV2ZW50Iiwia2V5Q29kZSIsInRhcmdldCIsIm5vZGVOYW1lIiwiZm9ybSIsImluZGV4IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsImVsZW1lbnRzIiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCIsImJpbmRBY3Rpb25Gb3JCdXR0b24iLCJvbmNsaWNrIiwiaWQiLCJpbm5lclRleHQiLCJzdWJtaXQiLCJsaXN0QnRuIiwiZm9yRWFjaCIsImJ0biIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBNEJGLFFBQTVCLENBQVY7QUFDQSxJQUFNRyxFQUFFLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFYO0FBRUEsSUFBTUssVUFBVSxHQUFHTixDQUFDLENBQUMsb0JBQUQsQ0FBcEI7QUFDQSxJQUFNTyxpQkFBaUIsR0FBR0gsRUFBRSxDQUFDLGFBQUQsQ0FBNUI7QUFDQSxJQUFNSSxnQkFBZ0IsR0FBR1IsQ0FBQyxDQUFDLG1CQUFELENBQTFCO0FBRUEsSUFBTVMsR0FBRyxHQUFHO0FBQ1I7QUFDQUMsYUFBVyxFQUFFLHVCQUFXO0FBQ3BCLFFBQU1DLEtBQUssR0FBRyxJQUFkLENBRG9CLENBRXBCOzs7QUFDQSxRQUFJTCxVQUFKLEVBQWdCO0FBQ1pBLGdCQUFVLENBQUNNLFNBQVgsR0FBdUIsVUFBU0MsS0FBVCxFQUFnQjtBQUNuQyxZQUFJQSxLQUFLLENBQUNDLE9BQU4sS0FBa0IsRUFBbEIsSUFBd0JELEtBQUssQ0FBQ0UsTUFBTixDQUFhQyxRQUFiLEtBQTBCLE9BQXRELEVBQStEO0FBQzNELGNBQUlDLElBQUksR0FBR0osS0FBSyxDQUFDRSxNQUFOLENBQWFFLElBQXhCO0FBQ0EsY0FBSUMsS0FBSyxHQUFHQyxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCQyxJQUF4QixDQUNSTCxJQURRLEVBRVJKLEtBQUssQ0FBQ0UsTUFGRSxDQUFaO0FBSUFFLGNBQUksQ0FBQ00sUUFBTCxDQUFjTCxLQUFLLEdBQUcsQ0FBdEIsRUFBeUJNLEtBQXpCO0FBQ0FYLGVBQUssQ0FBQ1ksY0FBTjtBQUNIO0FBQ0osT0FWRDtBQVdIOztBQUVELFFBQUlsQixpQkFBSixFQUF1QjtBQUNuQixXQUFLbUIsbUJBQUwsQ0FBeUJuQixpQkFBekI7QUFDSDs7QUFFRCxRQUFJQyxnQkFBSixFQUFzQjtBQUNsQkEsc0JBQWdCLENBQUNtQixPQUFqQixHQUEyQixZQUFXO0FBQ2xDLFlBQU1DLEVBQUUsR0FBRzVCLENBQUMsQ0FBQyxvQkFBRCxDQUFELENBQXdCNkIsU0FBbkM7QUFDQSxZQUFNWixJQUFJLEdBQUdqQixDQUFDLENBQUMsV0FBVzRCLEVBQVosQ0FBZDtBQUVBWCxZQUFJLENBQUNhLE1BQUw7QUFDSCxPQUxEO0FBTUg7QUFDSixHQS9CTztBQWlDUkoscUJBQW1CLEVBQUUsNkJBQVNLLE9BQVQsRUFBa0I7QUFDbkNBLFdBQU8sQ0FBQ0MsT0FBUixDQUFnQixVQUFBQyxHQUFHLEVBQUk7QUFDbkIsVUFBTUwsRUFBRSxHQUFHSyxHQUFHLENBQUNMLEVBQWY7O0FBRUFLLFNBQUcsQ0FBQ04sT0FBSixHQUFjLFlBQVc7QUFDckIzQixTQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QjZCLFNBQXhCLEdBQW9DRCxFQUFwQztBQUNILE9BRkQ7QUFHSCxLQU5EO0FBT0gsR0F6Q087QUEyQ1JNLE9BQUssRUFBRSxpQkFBVztBQUNkLFNBQUt4QixXQUFMO0FBQ0g7QUE3Q08sQ0FBWjtBQWdEQUQsR0FBRyxDQUFDeUIsS0FBSiIsImZpbGUiOiIuL3Jlc291cmNlcy9qcy9leHBvcnRzL2V4cG9ydHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KTtcbmNvbnN0ICQkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KTtcblxuY29uc3QgaW5wdXRQcm9ObyA9ICQoXCIjZm9ybS1hZGQtbG9jYXRpb25cIik7XG5jb25zdCBidG5EZWxldGVMb2NhdGlvbiA9ICQkKFwiLmJ0bi1kZWxldGVcIik7XG5jb25zdCBidG5Db25maXJtRGVsZXRlID0gJChcIiNidG5Db25maXJtRGVsZXRlXCIpO1xuXG5jb25zdCBhcHAgPSB7XG4gICAgLy8gaGFuZGxlIGV2ZW50IG9mIGFwcFxuICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBtYXAgZW50ZXIga2V5IHRvIHRhYiBrZXlcbiAgICAgICAgaWYgKGlucHV0UHJvTm8pIHtcbiAgICAgICAgICAgIGlucHV0UHJvTm8ub25rZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSBcIklOUFVUXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBldmVudC50YXJnZXQuZm9ybTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5lbGVtZW50c1tpbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChidG5EZWxldGVMb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5iaW5kQWN0aW9uRm9yQnV0dG9uKGJ0bkRlbGV0ZUxvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChidG5Db25maXJtRGVsZXRlKSB7XG4gICAgICAgICAgICBidG5Db25maXJtRGVsZXRlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9ICQoXCIjaWRQcm9kdWN0TG9jYXRpb25cIikuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSAkKFwiI2Zvcm0tXCIgKyBpZCk7XG5cbiAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiaW5kQWN0aW9uRm9yQnV0dG9uOiBmdW5jdGlvbihsaXN0QnRuKSB7XG4gICAgICAgIGxpc3RCdG4uZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBidG4uaWQ7XG5cbiAgICAgICAgICAgIGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChcIiNpZFByb2R1Y3RMb2NhdGlvblwiKS5pbm5lclRleHQgPSBpZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnQoKTtcbiAgICB9XG59O1xuXG5hcHAuc3RhcnQoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/exports/exports.js\n");

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