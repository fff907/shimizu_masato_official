$(document).ready(function() {
	// ハンバーガーメニューボタンのクリックイベント
	$(".hamburger-button").click(function(event) {
	$(".sp-nav").slideToggle();
	});
	// ナビゲーションリンクのクリックイベント
	$(".sp-nav-list a").click(function(event) {
	$(".sp-nav").slideUp();
	});
	});