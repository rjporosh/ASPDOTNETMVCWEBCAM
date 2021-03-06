USE [master]
GO
/****** Object:  Database [BiometricRegistration]    Script Date: 5/29/2019 1:12:58 PM ******/
CREATE DATABASE [BiometricRegistration]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BiometricRegistration_Data', FILENAME = N'c:\dzsqls\BiometricRegistration.mdf' , SIZE = 3136KB , MAXSIZE = 15360KB , FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BiometricRegistration_Logs', FILENAME = N'c:\dzsqls\BiometricRegistration.ldf' , SIZE = 1024KB , MAXSIZE = 20480KB , FILEGROWTH = 10%)
GO
ALTER DATABASE [BiometricRegistration] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BiometricRegistration].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BiometricRegistration] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BiometricRegistration] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BiometricRegistration] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BiometricRegistration] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BiometricRegistration] SET ARITHABORT OFF 
GO
ALTER DATABASE [BiometricRegistration] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BiometricRegistration] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BiometricRegistration] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BiometricRegistration] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BiometricRegistration] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BiometricRegistration] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BiometricRegistration] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BiometricRegistration] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BiometricRegistration] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BiometricRegistration] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BiometricRegistration] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BiometricRegistration] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BiometricRegistration] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BiometricRegistration] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BiometricRegistration] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BiometricRegistration] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BiometricRegistration] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BiometricRegistration] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BiometricRegistration] SET  MULTI_USER 
GO
ALTER DATABASE [BiometricRegistration] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BiometricRegistration] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BiometricRegistration] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BiometricRegistration] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'BiometricRegistration', N'ON'
GO
USE [BiometricRegistration]
GO
/****** Object:  User [rjporoshbio_SQLLogin_1]    Script Date: 5/29/2019 1:13:03 PM ******/
CREATE USER [rjporoshbio_SQLLogin_1] FOR LOGIN [rjporoshbio_SQLLogin_1] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [rjporoshbio_SQLLogin_1]
GO
/****** Object:  Schema [rjporoshbio_SQLLogin_1]    Script Date: 5/29/2019 1:13:04 PM ******/
CREATE SCHEMA [rjporoshbio_SQLLogin_1]
GO
/****** Object:  Table [dbo].[tbl_Biometric]    Script Date: 5/29/2019 1:13:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Biometric](
	[Id] [int] NOT NULL,
	[SerialNumber] [varchar](50) NULL,
	[ImageHeight] [int] NULL,
	[ImageWidth] [int] NULL,
	[ImageDPI] [int] NULL,
	[ImageQuality] [int] NULL,
	[NFIQ] [int] NULL,
	[TemplateBase64] [varchar](max) NULL,
	[WSQImageSize] [int] NULL,
	[WSQImage] [varchar](max) NULL,
 CONSTRAINT [PK_tbl_Biometric] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Registration]    Script Date: 5/29/2019 1:13:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Registration](
	[ID] [int] NULL,
	[RegistrationNumber] [varchar](50) NULL,
	[FullName] [varchar](50) NULL,
	[ImagePath] [varchar](max) NULL,
	[FingerPrint] [varchar](max) NULL,
	[Userpic] [varchar](max) NULL,
	[FingerPrintImagePath] [varchar](max) NULL,
	[iid] [int] IDENTITY(1,1) NOT NULL,
	[SerialNumber] [varchar](50) NULL,
	[ImageHeight] [int] NULL,
	[ImageWidth] [int] NULL,
	[ImageDPI] [int] NULL,
	[ImageQuality] [int] NULL,
	[NFIQ] [int] NULL,
	[TemplateBase64] [varchar](max) NULL,
	[WSQImageSize] [int] NULL,
	[WSQImage] [varchar](max) NULL,
	[tbl_RegistrationId] [int] NULL,
 CONSTRAINT [PK_tbl_Registration] PRIMARY KEY CLUSTERED 
(
	[iid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_Registration]  WITH CHECK ADD  CONSTRAINT [FK_tbl_Registration_tbl_Biometric] FOREIGN KEY([tbl_RegistrationId])
REFERENCES [dbo].[tbl_Biometric] ([Id])
GO
ALTER TABLE [dbo].[tbl_Registration] CHECK CONSTRAINT [FK_tbl_Registration_tbl_Biometric]
GO
USE [master]
GO
ALTER DATABASE [BiometricRegistration] SET  READ_WRITE 
GO
