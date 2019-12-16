/*
 Navicat MySQL Data Transfer

 Source Server         : fitstsql
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : boke

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 01/12/2019 21:37:10
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for boke_userinfo
-- ----------------------------
DROP TABLE IF EXISTS `boke_userinfo`;
CREATE TABLE `boke_userinfo`  (
  `isAdmin` tinyint(1) NULL DEFAULT 0,
  `password` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of boke_userinfo
-- ----------------------------
INSERT INTO `boke_userinfo` VALUES (1, '9i659259', 'chenjianyong');
INSERT INTO `boke_userinfo` VALUES (1, 'eee', 'eee');
INSERT INTO `boke_userinfo` VALUES (0, 'shabi', 'molixin');
INSERT INTO `boke_userinfo` VALUES (0, '9i659259', 'shabimolixin');
INSERT INTO `boke_userinfo` VALUES (0, 'molixinshishabi', 'molixinshishabi');
INSERT INTO `boke_userinfo` VALUES (0, '123456', 'cjy');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `username` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('20', '2018-12-08 21:53:57', 'chenjianyong', '??????????????');
INSERT INTO `comment` VALUES ('20', '2018-12-08 21:54:16', 'chenjianyong', 'molixin kending shi shabi 2333333333');
INSERT INTO `comment` VALUES ('20', '2018-12-08 21:54:32', 'chenjianyong', 'molixin zhende shi shabi hahahahahhaha');
INSERT INTO `comment` VALUES ('20', '2018-12-08 21:54:49', 'chenjianyong', '????????');
INSERT INTO `comment` VALUES ('20', '2018-12-08 21:59:16', 'molixinshishabi', 'woyelai  molixinshishabi');
INSERT INTO `comment` VALUES ('20', '2018-12-08 21:59:27', 'molixinshishabi', 'molixin kending shishabi');
INSERT INTO `comment` VALUES ('20', '2019-01-05 16:17:20', 'chenjianyong', 'eee');
INSERT INTO `comment` VALUES ('13', '2019-11-29 10:00:47', 'cjy', '??????');

-- ----------------------------
-- Table structure for contenttable
-- ----------------------------
DROP TABLE IF EXISTS `contenttable`;
CREATE TABLE `contenttable`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` char(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` char(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category` int(11) NOT NULL,
  `addtime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `readcount` int(5) UNSIGNED NULL DEFAULT 0,
  `comments` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of contenttable
-- ----------------------------
INSERT INTO `contenttable` VALUES (12, 'chenjianyong', 'HTML??', '???????????', 'HTML??', 5, '2018-12-08 21:43:44', 1, NULL);
INSERT INTO `contenttable` VALUES (13, 'chenjianyong', 'HTML??1', '?????HTML???', 'HTML??1', 5, '2018-12-08 21:45:13', 8, NULL);
INSERT INTO `contenttable` VALUES (14, 'chenjianyong', 'CSS??', '?????CSS??', 'CSS??', 6, '2018-12-08 21:46:02', 0, NULL);
INSERT INTO `contenttable` VALUES (15, 'chenjianyong', 'CSS??1', '?????,CSS???', 'CSS??1', 6, '2018-12-08 21:47:06', 1, NULL);
INSERT INTO `contenttable` VALUES (16, 'chenjianyong', 'Vuejs??', '??????Vuejs????', 'Vuejs?????', 7, '2018-12-08 21:48:00', 0, NULL);
INSERT INTO `contenttable` VALUES (17, 'chenjianyong', 'Vuejs?????????', '??????vuejs???', 'Vuejs??', 7, '2018-12-08 21:49:44', 0, NULL);
INSERT INTO `contenttable` VALUES (18, 'chenjianyong', 'Nodejs??', '?????Nodejs????', 'Nodejs???????????', 8, '2018-12-08 21:50:32', 1, NULL);
INSERT INTO `contenttable` VALUES (19, 'chenjianyong', 'Nodejs????', '?????nodejs????????', '??Nodejs???', 8, '2018-12-08 21:51:25', 0, NULL);
INSERT INTO `contenttable` VALUES (20, 'chenjianyong', 'Node?????', '????,nodejs????', '??Nodejs?????', 8, '2018-12-08 21:52:10', 29, NULL);

-- ----------------------------
-- Table structure for fenleitable
-- ----------------------------
DROP TABLE IF EXISTS `fenleitable`;
CREATE TABLE `fenleitable`  (
  `name` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `_id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fenleitable
-- ----------------------------
INSERT INTO `fenleitable` VALUES ('HTML', 5);
INSERT INTO `fenleitable` VALUES ('CSS', 6);
INSERT INTO `fenleitable` VALUES ('Vuejs', 7);
INSERT INTO `fenleitable` VALUES ('Nodejs', 8);
INSERT INTO `fenleitable` VALUES ('javascript', 9);
INSERT INTO `fenleitable` VALUES ('xiaobaohao', 10);

SET FOREIGN_KEY_CHECKS = 1;
