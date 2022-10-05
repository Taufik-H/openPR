for i in $(cat all | sort -u ); do
	check_res_ssl=$(shodan count ssl.cert.subject.cn:"${i}")
	check_res_hostname=$(shodan count hostname:"${i}")
	if [[ $check_res_ssl -gt "0" ]]; then
        shodan download ssl_$i ssl.cert.subject.cn:"${i}" && shodan parse --fields ip_str,port --separator : ssl_$i.json.gz | sort -u |  awk '{print "http://"$0}' >> ip_$i.txt
    elif [[ $check_res_hostname -gt "0" ]]; then
        shodan download hostname_$i hostname:"${i}" && shodan parse --fields ip_str,port --separator : hostname_$i.json.gz | sort -u |  awk '{print "http://"$0}' >> ip_$i.txt
    else
		for keyfone in $(echo $i | cut -d "." -f1 | sort -u); do
			check_res_html=$(shodan count http.html:"${keyfone}")
			if [[ $check_res_html -gt "0" ]]; then
	            shodan download body_$i http.html:"${i}" && shodan parse --fields ip_str,port --separator : body_$i.json.gz | sort -u |  awk '{print "http://"$0}' >> ip_$i.txt
	        else
	                echo "[-] No res : $i"
	        fi
		done
		for keyftwo in $(echo $i | cut -d "." -f2 | sort -u); do
			check_res_html=$(shodan count http.html:"${keyftwo}")
			if [[ $check_res_html -gt "0" ]]; then
	            shodan download body_$i http.html:"${i}" && shodan parse --fields ip_str,port --separator : body_$i.json.gz | sort -u |  awk '{print "http://"$0}' >> ip_$i.txt
	        else
	                echo "[-] No res : $i"
	        fi
		done
	fi
done