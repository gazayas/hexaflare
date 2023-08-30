FROM pierrezemb/gostatic
COPY . /srv/http/
CMD ["-port","8043","-https-promote", "-enable-logging"]
