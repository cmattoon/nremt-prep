FROM library/php:7.0-apache

LABEL org.label-schema.schema-version = "1.0"
LABEL org.label-schema.version = "0.1.0"
LABEL org.label-schema.name = "nremt-prep"
LABEL org.label-schema.description = "Webserver tier for practice quizzes"
LABEL org.label-schema.usage = "README.md"
LABEL org.label-schema.vcs-url = "https://github.com/cmattoon/nremt-prep"
LABEL org.label-schema.vcs-ref = "<vcs-ref:todo>"
LABEL org.label-schema.docker.cmd = "docker run -v ./data:/data -p 8080:80 -t cmattoon/nremt-prep"

