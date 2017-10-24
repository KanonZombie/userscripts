// ==UserScript==
// @name        Reportes
// @namespace   Zombie
// @require https://code.jquery.com/jquery-1.11.3.js
// @include     http://reportes/_layouts/ReportServer/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() 
                  {
                    setTimeout(function() 
                               {
                                  //$('#m_sqlRsWebPart > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > table:nth-child(1)')
                                  $('#m_sqlRsWebPart_ctl06_ctl13').attr('style','width: 100%');
                                  $('#m_sqlRsWebPart_ctl06_ctl13').width("100%")
                                  $('#m_sqlRsWebPart_ctl06_ctl13').height("100%")
                               }, 500); //Two seconds will elapse and Code will execute.
                  }
); 


