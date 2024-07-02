@echo off
echo                             _                       _     _   
echo                            ^| ^|                     ^| ^|   ^| ^|  
echo   ___  _ __   ___ _ __   __^| ^|_ __ __ _ _   _  __ _^| ^|__ ^| ^|_ 
echo  / _ \^| '_ \ / _ \ '_ \ / _` ^| '__/ _` ^| ^| ^| ^|/ _` ^| '_ \^| __^|
echo ^| (_) ^| ^|_) ^|  __/ ^| ^| ^| (_^| ^| ^| ^| (_^| ^| ^|_^| ^| (_^| ^| ^| ^| ^| ^|_ 
echo  \___/^| .__/ \___^|_^| ^|_^|\__,_^|_^|  \__,_^|\__,_^|\__, ^|_^| ^|_^|\__^|
echo       ^| ^|                                      __/ ^|          
echo       ^|_^|                                     ^|___/           
start taplist.url
@echo Closing this window will end openDraught and your taplist will be unaccessible until you open openDraught again
node server.js