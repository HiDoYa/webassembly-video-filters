build:  
	./gn gen out/mac
	ninja -C out/mac
clean:
	./gn clean out/mac
	rm -rf out/mac
