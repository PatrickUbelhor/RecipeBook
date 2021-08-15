package com.patrickubelhor.recipe.converter;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;


@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {
	private static final String SPLIT_CHAR = "\n";
	
	@Override
	public String convertToDatabaseColumn(List<String> stringList) {
		if (stringList == null) {
			return "";
		}
		
		// Encode all elements to base-64
		List<String> encodedList = stringList.stream()
				.map(original -> Base64.getEncoder().encodeToString(original.getBytes(StandardCharsets.UTF_8)))
				.collect(Collectors.toList());
		
		return String.join(SPLIT_CHAR, encodedList);
	}
	
	@Override
	public List<String> convertToEntityAttribute(String string) {
		if (string == null) {
			return Collections.emptyList();
		}
		
		// Split string, then decode each segment
		return Arrays.stream(string.split(SPLIT_CHAR))
				.map(encoded -> new String(Base64.getDecoder().decode(encoded)))
				.collect(Collectors.toList());
	}
}
