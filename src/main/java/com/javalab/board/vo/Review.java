package com.javalab.board.vo;

public class Review {
    private String productName;
    private String content;

    public Review(String productName, String content) {
        this.productName = productName;
        this.content = content;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}