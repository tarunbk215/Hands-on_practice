package SingletonPatternExample;

class Logger {
    // private static instance of itself
    private static Logger instance;

    // constructor of Logger is private.....
    private Logger() {
        System.out.println("Logger Instance Created!.");
    }

    // public static method to get the instance of the Logger class
    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    // logging
    public void log(String message) {
        System.out.println("log: " + message);
    }
}