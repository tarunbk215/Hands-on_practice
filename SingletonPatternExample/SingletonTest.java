package SingletonPatternExample;

public class SingletonTest {
    public static void main(String[] args) {
        // get logger...
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        // use logger..
        logger1.log("Application Start.");
        logger2.log("Running Application...");

        if (logger1 == logger2) {
            System.out.println("ONE logger instance is there.");
        } else {
            System.out.println("more than one logger instances are there.. ");
        }
    }
}
